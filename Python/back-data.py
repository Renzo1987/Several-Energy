# Flask app
from flask import Flask, render_template, jsonify, request
import psycopg2
import json
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import os
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service

import time

app = Flask(__name__)
CORS(app)

# Configuración de la conexión a la base de datos
config = {
    'user': 'postgres',
    'password': 'DesafioNG1',
    'host': '35.241.146.138',
    'port': '5432',
    'database': 'postgres'
}

def consulta_resultados(sistema, tarifa, cia, metodo, producto_cia):
    
    print("request url:", request.url)
    print("request:", request.form)

    sistema_seleccionado = sistema
    tarifa_seleccionada = tarifa
    cia_seleccionada = cia
    metodo_seleccionado = metodo
    producto_cia_seleccionada = producto_cia

    print("sistema_seleccionado:", sistema_seleccionado)
    print("tarifa_seleccionada:", tarifa_seleccionada)
    print("cia_seleccionada:", cia_seleccionada)
    print("metodo_seleccionado:", metodo_seleccionado)
    print("producto_cia_seleccionada:", producto_cia_seleccionada)



    try:
        # Conectar a la base de datos
        conn = psycopg2.connect(**config)

        # Crear un cursor para ejecutar la consulta
        cursor = conn.cursor()
        if metodo_seleccionado == 'FIJO':
            # Consulta SQL para obtener los datos según los filtros
            consulta_datos = f"""
                SELECT p1, p2, p3, p4, p5, p6, p1_, p2_, p3_, p4_, p5_, p6_
                FROM precios_fijo
                WHERE sistema = '{sistema_seleccionado}' 
                    AND tarifa = '{tarifa_seleccionada}' 
                    AND cia = '{cia_seleccionada}' 
                    AND producto_cia = '{producto_cia_seleccionada}'
            """
            cursor.execute(consulta_datos)

            data = cursor.fetchall()
            print(data)
            cursor.close()  
            conn.close()

            return data

        elif metodo_seleccionado == 'INDEXADO':
            print("-----ENTRA-----")
            consulta_datos_energia = f"""
                SELECT p1_, p2_, p3_, p4_, p5_, p6_
                FROM precios_index_energia
                WHERE sistema = '{sistema_seleccionado}' 
                    AND tarifa = '{tarifa_seleccionada}' 
                    AND cia = '{cia_seleccionada}' 
                    LIMIT 1
                    
            """
            cursor.execute(consulta_datos_energia)

            data_energia = cursor.fetchall()

            consulta_datos_potencia = f"""
                SELECT p1, p2, p3, p4, p5, p6
                FROM precios_index_potencia
                WHERE sistema = '{sistema_seleccionado}' 
                    AND tarifa = '{tarifa_seleccionada}' 
                    AND cia = '{cia_seleccionada}'
                    LIMIT 1
                    
            """
            cursor.execute(consulta_datos_potencia)

            data_potencia = cursor.fetchall()

            cursor.close()  
            conn.close()

            print("data_energia: ", data_energia)
            print("data_energia: ", data_potencia)
            data_total = [data_energia[0] + data_potencia[0]]
            
            print("----Datos totales:", data_total)
            return data_total
       
        
        

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
def transformar_precios(precios):
    nuevos_precios = {}

    for i, valor in enumerate(precios):
        clave = f"p{i+1}" if i < 6 else f"P{i-5}"
        nuevos_precios[clave] = valor

    return nuevos_precios

@app.route('/')

@app.route('/load_filters', methods=['GET'])
def cargar_filtros():

    try:
        conn = psycopg2.connect(**config)
        cursor = conn.cursor()

        # Consulta SQL para CIAs
        consulta_cias = "SELECT DISTINCT cia FROM precios_fijo"
        cursor.execute(consulta_cias)
        cias = [fila[0] for fila in cursor.fetchall()]
        print("cias:", cias)
        # Consulta SQL para Fees (usando la primera CIA como ejemplo)
        primera_cia = cias[1] if cias else None
        print(primera_cia)
        consulta_producto_cia = f"SELECT DISTINCT producto_cia FROM precios_fijo WHERE cia = '{primera_cia}'"
        cursor.execute(consulta_producto_cia)
        producto_cia = [fila[0] for fila in cursor.fetchall()]
        primer_producto_cia = producto_cia[1] if producto_cia else None

        # Cerrar el cursor y la conexión
        cursor.close()
        conn.close()

        # Forzamos la definición de los valores de los otros filtros.
        sistemas = ['PENINSULA', 'BALEARES', 'CANARIAS']
        primer_sistema = sistemas[0] if sistemas else None
        tarifas = ['2.0TD', '3.0TD', '6.1TD', '6.2TD']
        primera_tarifa = tarifas[0] if tarifas else None
        metodos =['FIJO', 'INDEXADO']
        primer_metodo = metodos[0] if metodos else None

        # Parametros necesarios: cia, sistema, tarifa, fee
        precios = consulta_resultados(primer_sistema, primera_tarifa, primera_cia, primer_metodo, primer_producto_cia)

        
        # Crear un diccionario con los resultados
        resultado_json = {'sistemas': sistemas,'tarifas': tarifas,'cias': cias,'metodos': metodos, 'producto_cia': producto_cia,'precios': precios}
        # Modificamos el json para añadir etiquetas para los precios.
        resultado_json["precios"] = [transformar_precios(resultado_json["precios"][0])]

        # Convertir el diccionario a formato JSON
        json_resultado = json.dumps(resultado_json)
        # Retornar el JSON
        return json_resultado

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

# Ruta para manejar la selección del botón y cargar las Fees
@app.route('/reload_filters', methods=['POST'])
def recargar_filtros():
    sistema_seleccionado = request.args.get('sistema')
    tarifa_seleccionada = request.args.get('tarifa')
    cia_seleccionada = request.args.get('cia')
    metodo_seleccionado = request.args.get('metodo')
    producto_cia_selecionado = request.args.get('producto_cia')

    print(sistema_seleccionado)
    print(tarifa_seleccionada)
    print(cia_seleccionada)
    print(metodo_seleccionado)
    print(producto_cia_selecionado)


    try:
        # Conectar a la base de datos
        conn = psycopg2.connect(**config)

        # Crear un cursor para ejecutar la consulta
        cursor = conn.cursor()

        # Consulta SQL para Fees
        if metodo_seleccionado == 'INDEXADO':
            # !!!
            consulta_tarifa = f"SELECT DISTINCT tarifa FROM precios_index_energia"
            cursor.execute(consulta_tarifa)
            tarifa_index = [fila[0] for fila in cursor.fetchall()]

            consulta_cia = f"SELECT DISTINCT cia FROM precios_index_energia"
            cursor.execute(consulta_cia)
            cia_index = [fila[0] for fila in cursor.fetchall()]

            consulta_producto_cia = f"SELECT DISTINCT producto_cia FROM precios_index_potencia WHERE cia = '{cia_seleccionada}' AND tarifa = '{tarifa_seleccionada}'"
            cursor.execute(consulta_producto_cia)
            producto_cia_index = [fila[0] for fila in cursor.fetchall()]

            consulta_meses = f"SELECT DISTINCT mes FROM precios_index_energia WHERE cia = '{cia_seleccionada}' AND tarifa = '{tarifa_seleccionada}'"
            cursor.execute(consulta_meses)
            meses_index = [fila[0] for fila in cursor.fetchall()]

            consulta_fees = f"SELECT DISTINCT fee FROM precios_index_energia WHERE cia = '{cia_seleccionada}' AND tarifa = '{tarifa_seleccionada}'"
            cursor.execute(consulta_fees)
            fees_index = [fila[0] for fila in cursor.fetchall()]

            # Cerrar el cursor y la conexión
            cursor.close()
            conn.close()
           
            meses_index = [fecha.strftime('%Y-%m-%d') for fecha in meses_index]

            precios = consulta_resultados(sistema_seleccionado, tarifa_seleccionada, cia_seleccionada, metodo_seleccionado, producto_cia_selecionado)

            resultado_json = {'tarifa': tarifa_index, 'cia':cia_index, 'producto_cia': producto_cia_index, 'meses': meses_index, 'producto_cia': fees_index, 'precios': precios}
            
            resultado_json["precios"] = [transformar_precios(resultado_json["precios"][0])]

            # Convertir el diccionario a formato JSON
            json_resultado = json.dumps(resultado_json)
            # Retornar el JSON
            return json_resultado
        
        elif metodo_seleccionado == 'FIJO':

            consulta_tarifa = f"SELECT DISTINCT tarifa FROM precios_fijo"
            cursor.execute(consulta_tarifa)
            tarifa_fijo = [fila[0] for fila in cursor.fetchall()]
            
            print("tarifa:", tarifa_fijo)

            consulta_cia = f"SELECT DISTINCT cia FROM precios_fijo"
            cursor.execute(consulta_cia)
            cia_fijo = [fila[0] for fila in cursor.fetchall()]

            print("cia:",cia_fijo)

            consulta_producto_cia = f"SELECT DISTINCT producto_cia FROM precios_fijo WHERE cia = '{cia_seleccionada}'"
            cursor.execute(consulta_producto_cia)
            producto_cia_fijo = [fila[0] for fila in cursor.fetchall()]
            
            print("producto_cia:",producto_cia_fijo)
            # Cerrar el cursor y la conexión
            cursor.close()
            conn.close()

            precios = consulta_resultados(sistema_seleccionado, tarifa_seleccionada, cia_seleccionada, metodo_seleccionado, producto_cia_selecionado)

            resultado_json = {'tarifa': tarifa_fijo, 'cia':cia_fijo, 'producto_cia': producto_cia_fijo, 'precios': precios}
            
            resultado_json["precios"] = [transformar_precios(resultado_json["precios"][0])]

            # Convertir el diccionario a formato JSON
            json_resultado = json.dumps(resultado_json)
            # Retornar el JSON
            return json_resultado

            # Devolver las Fees como respuesta JSON
            # YA TENEMOS EL JSON QUE DEVUELVE LOS PRODUCTOS CUANDO ES FIJO, LOS PROUCTOS Y LAS FECHAS CUANDO ES INDEXADO

        

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

# Nueva ruta para manejar la consulta a la tabla precios_fijo
#@app.route('/consulta_resultados', methods=['POST'])

@app.route("/cups", methods=['POST'])
def tu_endpoint():
    try:
        # Obtener el dato del CUPS desde la solicitud POST
        data = request.get_json()
        cups = data['cups']

        def webscraping (num_cup):
            directorio_actual = os.path.dirname(os.path.abspath(__file__))
            chromedriver_path = os.path.join(directorio_actual, 'chromedriver.exe')
            service = Service(executable_path=chromedriver_path)
            
            options = webdriver.ChromeOptions()
            options.add_argument('--headless')
            
            
            
            driver = webdriver.Chrome(service=service, options=options)

            driver.get("https://agentes.candelaenergia.es/#/sips")

            empresa_input = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.NAME, 'empresaLogin'))
    )

            # Encuentra los campos de empresa, usuario y contraseña por su nombre o cualquier otro atributo
            empresa_input = driver.find_element(By.NAME, 'empresaLogin')
            usuario_input = driver.find_element(By.NAME, 'usuario')
            contrasena_input = driver.find_element(By.NAME, 'password')

            # Ingresa las credenciales
            empresa_input.send_keys('CANDELA COMERCIALIZADORA, S.L ELECTRICIDAD')
            usuario_input.send_keys('CA091')
            contrasena_input.send_keys('CI001-091/8463')

            # Encuentra el botón de "Entrar" por su clase (puedes usar otro selector según sea necesario)
            entrar_button = driver.find_element(By.CLASS_NAME, 'btn-white')

            # Haz clic en el botón usando JavaScript
            driver.execute_script("arguments[0].click();", entrar_button)

            # Encuentra el enlace que representa la sección "SIPS" por su atributo href
            time.sleep(5)
            enlace_sips = driver.find_element(By.CSS_SELECTOR, 'a[href="#/sips"]')

            # Haz clic en el enlace usando JavaScript
            driver.execute_script("arguments[0].click();", enlace_sips)
            
            # Encuentra el campo de entrada por su ID (puedes usar otro selector según sea necesario)
            time.sleep(5)
            campo_input = driver.find_element(By.ID, 'input_6')
            
            # Ingresa el número deseado en el campo
            campo_input.send_keys(num_cup)

            # Puedes también enviar una tecla "Enter" para confirmar el ingreso del número (opcional)
            campo_input.send_keys(Keys.RETURN)
            time.sleep(5)

            # Encuentra el botón "Consultar" por su clase (puedes usar otro selector según sea necesario)
            boton_consultar = driver.find_element(By.CLASS_NAME, 'md-raised')

            # Haz clic en el botón usando JavaScript
            driver.execute_script("arguments[0].click();", boton_consultar)
            time.sleep(5)

            # Recogemos todas las variables 

            municipio_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsMunicipio']")
            municipio = municipio_element.text

            provincia_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsProvincia']")
            provincia = provincia_element.text

            CP_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsCodigoPostal']")
            cp = CP_element.text

            tarifa_element = driver.find_element(By.ID, "SipsTarifa")
            tarifa = tarifa_element.text

            cons_anu_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsConsumoAnual && VerEnergia']")
            cons_anu_t = cons_anu_element.text
            cons_anu = ''.join(filter(str.isdigit, cons_anu_t))
            cons_anu = float(cons_anu)

            cons_anu_p1_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsConsumoP1 && VerEnergia']")
            cons_anu_p1_t = cons_anu_p1_element.text
            cons_anu_p1 = ''.join(filter(str.isdigit, cons_anu_p1_t))
            cons_anu_p1 = float(cons_anu_p1)

            cons_anu_p2_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsConsumoP2 && VerEnergia']")
            cons_anu_p2_t = cons_anu_p2_element.text
            cons_anu_p2 = ''.join(filter(str.isdigit, cons_anu_p2_t))
            cons_anu_p2 = float(cons_anu_p2)

            cons_anu_p3_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsConsumoP3 && VerEnergia']")
            cons_anu_p3_t = cons_anu_p3_element.text
            cons_anu_p3 = ''.join(filter(str.isdigit, cons_anu_p3_t))
            cons_anu_p3 = float(cons_anu_p3)

            cons_anu_p4_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsConsumoP4 && VerEnergia']")
            cons_anu_p4_t = cons_anu_p4_element.text
            cons_anu_p4 = ''.join(filter(str.isdigit, cons_anu_p4_t))
            cons_anu_p4 = float(cons_anu_p4)

            cons_anu_p5_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsConsumoP5 && VerEnergia']")
            cons_anu_p5_t = cons_anu_p5_element.text
            cons_anu_p5 = ''.join(filter(str.isdigit, cons_anu_p5_t))
            cons_anu_p5 = float(cons_anu_p5)

            cons_anu_p6_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsConsumoP6 && VerEnergia']")
            cons_anu_p6_t = cons_anu_p6_element.text
            cons_anu_p6 = ''.join(filter(str.isdigit, cons_anu_p6_t))
            cons_anu_p6 = float(cons_anu_p6)

            p1_element = driver.find_element(By.ID, "PotenciaP1")
            p1_t = p1_element.text.replace(',', '.')
            p1 = float(p1_t)

            p2_element = driver.find_element(By.ID, "PotenciaP2")
            p2_t = p2_element.text.replace(',', '.')
            p2 = float(p2_t)

            p3_element = driver.find_element(By.ID, "PotenciaP3")
            p3 = float(p3_element.text) if p3_element.text else 0.0


            p4_element = driver.find_element(By.ID, "PotenciaP4")
            p4 = float(p4_element.text) if p4_element.text else 0.0


            p5_element = driver.find_element(By.ID, "PotenciaP5")
            p5 = float(p5_element.text) if p5_element.text else 0.0


            p6_element = driver.find_element(By.ID, "PotenciaP6")
            p6 = float(p6_element.text) if p6_element.text else 0.0


            distribuidora_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsDistribuidora']")
            distribuidora = distribuidora_element.text

            ult_cam_comer_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsUltimoCambioComercializadora']")
            ult_cam_comer = ult_cam_comer_element.text

            bie_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsUltimoCambioBIE']")
            bie = bie_element.text

            tension_element = driver.find_element(By.XPATH, "//any[@ng-switch-when='02']")
            tension = tension_element.text

            ult_cam_contra_element = driver.find_element(By.XPATH, "//td[@class='md-cell ng-binding' and @ng-show='MostrarSipsUltimoCambioContrato']")
            ult_cam_contr = ult_cam_contra_element.text

            # Recogemos todos los datos y los almacenamos como diccionario

            datos_json = {
                'Municipio': municipio,
                'Provincia': provincia,
                'CodigoPostal': cp,
                'Tarifa': tarifa,
                'ConsumoAnual': cons_anu,
                'ConsumoAnualP1': cons_anu_p1,
                'ConsumoAnualP2': cons_anu_p2,
                'ConsumoAnualP3': cons_anu_p3,
                'ConsumoAnualP4': cons_anu_p4,
                'ConsumoAnualP5': cons_anu_p5,
                'ConsumoAnualP6': cons_anu_p6,
                'P1': p1,
                'P2': p2,
                'P3': p3,
                'P4': p4,
                'P5': p5,
                'P6': p6,
                'Distribuidora': distribuidora,
                'CambioComercializadora': ult_cam_comer,
                'UltimoCambioBIE': bie,
                'Tensión': tension,
                'UltimoCambioContrato': ult_cam_contr
            }
            
            #convertimos el diccionario a modo JSON
            
            # json_resultado = json.dumps(datos_json)c

            return datos_json

        # Llamar a la funcion de webscraping
        resultado_cups = webscraping(cups)
        

        # Devolver el resultado como JSON
        return jsonify(resultado_cups)

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
