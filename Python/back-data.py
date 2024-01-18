
# Flask app
from flask import Flask, render_template, jsonify, send_file, request
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
from webdriver_manager.chrome import ChromeDriverManager

from reportlab.pdfgen import canvas
from reportlab.platypus import Table, TableStyle
from reportlab.lib import colors

import time
from io import BytesIO

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



def consulta_resultados(sistema, tarifa, cia, metodo, producto_cia, fee, mes=None):
    
    print("request url:", request.url)
    print("request:", request.form)

    sistema_seleccionado = sistema
    tarifa_seleccionada = tarifa
    cia_seleccionada = cia
    metodo_seleccionado = metodo
    producto_cia_seleccionada = producto_cia
    fee_seleccionado = fee
    mes_seleccionado = mes

    print("sistema_seleccionado:", sistema_seleccionado)
    print("tarifa_seleccionada:", tarifa_seleccionada)
    print("cia_seleccionada:", cia_seleccionada)
    print("metodo_seleccionado:", metodo_seleccionado)
    print("producto_cia_seleccionada:", producto_cia_seleccionada)
    print("fee_seleccionado:", fee_seleccionado)
    print("mes_seleccionado:", mes_seleccionado)


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
                    AND fee = '{fee_seleccionado}'
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
                    AND fee = '{fee_seleccionado}'
                    AND mes = '{mes_seleccionado}'
                    
            """
            cursor.execute(consulta_datos_energia)

            data_energia = cursor.fetchall()

            consulta_datos_potencia = f"""
                SELECT p1, p2, p3, p4, p5, p6
                FROM precios_index_potencia
                WHERE sistema = '{sistema_seleccionado}' 
                    AND tarifa = '{tarifa_seleccionada}' 
                    AND cia = '{cia_seleccionada}'
                    AND producto_cia = '{producto_cia_seleccionada}'
                    
            """
            cursor.execute(consulta_datos_potencia)

            data_potencia = cursor.fetchall()

            cursor.close()  
            conn.close()

            print("data_energia: ", data_energia)
            print("data_potencia: ", data_potencia)
            data_total = [data_energia[0] + data_potencia[0]]
            
            print("----Datos totales:", data_total)
            return data_total
       
        
        

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
def transformar_precios(precios):
    nuevos_precios = {}

    for i, valor in enumerate(precios):
        if i < 6:
            clave = f"p{i+1}"
        elif 6 <= i < 12:
            clave = f"P{i-5}"
        else:
            clave = f"PM{i-11}"

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
        primera_cia = cias[0] if cias else None
        print(primera_cia)
        consulta_producto_cia = f"SELECT DISTINCT producto_cia FROM precios_fijo WHERE cia = '{primera_cia}'"
        cursor.execute(consulta_producto_cia)
        producto_cia = [fila[0] for fila in cursor.fetchall()]
        primer_producto_cia = producto_cia[0] if producto_cia else None

        consulta_fee = f"SELECT DISTINCT fee FROM precios_fijo WHERE cia = '{primera_cia}'"
        cursor.execute(consulta_fee)
        fee = [fila[0] for fila in cursor.fetchall()]
        primer_fee = fee[0] if fee else None

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
        meses =['-']
        primer_mes = meses[0] if meses else None

        # Parametros necesarios: cia, sistema, tarifa, fee
        precios = consulta_resultados(primer_sistema, primera_tarifa, primera_cia, primer_metodo, primer_producto_cia, primer_fee, primer_mes)

        
        # Crear un diccionario con los resultados
        resultado_json = {'sistemas': sistemas,'tarifas': tarifas,'cias': cias,'metodos': metodos, 'producto_cia': producto_cia,'precios': precios,'fee':fee}
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
    #sistema_seleccionado = request.args.get('sistema') #peninsula
    sistema_seleccionado = "PENINSULA"
    tarifa_seleccionada = request.args.get('tarifa') #2.0TD
    cia_seleccionada = request.args.get('cia') #iberdrola
    metodo_seleccionado = request.args.get('metodo') # FIJO
    #producto_cia_selecionado = request.args.get('producto_cia') 
    #fee_seleccionado = request.args.get('fee')
    #mes_seleccionado = request.args.get('mes')

    try:
        # Conectar a la base de datos
        conn = psycopg2.connect(**config)
        cursor = conn.cursor()

        if metodo_seleccionado == 'INDEXADO':
            print('----- INDEXADO -----')

            #probar mañana
            consulta_cia = f"SELECT DISTINCT cia FROM precios_index_energia"
            cursor.execute(consulta_cia)
            cia_index = [fila[0] for fila in cursor.fetchall()]
            print(cia_index)

            consulta_fee = f"SELECT DISTINCT fee FROM precios_index_energia WHERE cia = '{cia_seleccionada}' AND tarifa = '{tarifa_seleccionada}'"
            cursor.execute(consulta_fee)
            fee_index = [fila[0] for fila in cursor.fetchall()]
            print(fee_index)

            consulta_producto_cia = f"SELECT DISTINCT producto_cia FROM precios_index_potencia WHERE cia = '{cia_seleccionada}' AND tarifa = '{tarifa_seleccionada}'"
            cursor.execute(consulta_producto_cia)
            producto_cia_index = [fila[0] for fila in cursor.fetchall()]
            print(producto_cia_index)

            consulta_meses_energia = f"SELECT DISTINCT mes FROM precios_index_energia WHERE cia = '{cia_seleccionada}' AND tarifa = '{tarifa_seleccionada}'"
            cursor.execute(consulta_meses_energia)
            meses_index_energia = [fila[0] for fila in cursor.fetchall()]
            print(meses_index_energia)

            # Cerrar el cursor y la conexión
            cursor.close()
            conn.close()

            meses_index_energia = [fecha.strftime('%Y-%m-%d') for fecha in meses_index_energia]

            primer_fee = fee_index[0] if fee_index else None
            primer_producto_cia = producto_cia_index[0] if producto_cia_index else None
            primer_mes = meses_index_energia[0] if meses_index_energia else None

            #precios = consulta_resultados(sistema_seleccionado, tarifa_seleccionada, cia_seleccionada, metodo_seleccionado, primer_producto_cia, primer_fee, primer_mes)
            #######
            resultado_json = {'cia':cia_index,'fee': fee_index, 'producto_cia':producto_cia_index, 'meses': meses_index_energia}
            #resultado_json["precios"] = [transformar_precios(resultado_json["precios"][0])]
            # Convertir el diccionario a formato JSON
            json_resultado = json.dumps(resultado_json)
            # Retornar el JSON
            return json_resultado

        elif metodo_seleccionado == 'FIJO':
            print('----- FIJO -----')

            #probar mañana
            consulta_cia = f"SELECT DISTINCT cia FROM precios_fijo"
            cursor.execute(consulta_cia)
            cia_fijo = [fila[0] for fila in cursor.fetchall()]
            print(cia_fijo)

            consulta_fee = f"SELECT DISTINCT fee FROM precios_fijo WHERE cia = '{cia_seleccionada}' AND tarifa = '{tarifa_seleccionada}'"
            print(consulta_fee)
            cursor.execute(consulta_fee)
            fee_fijo = [fila[0] for fila in cursor.fetchall()]
            print(fee_fijo)

            consulta_producto_cia = f"SELECT DISTINCT producto_cia FROM precios_fijo WHERE cia = '{cia_seleccionada}' AND tarifa = '{tarifa_seleccionada}'"
            print(consulta_producto_cia)
            cursor.execute(consulta_producto_cia)
            producto_cia_fijo = [fila[0] for fila in cursor.fetchall()]
            print(producto_cia_fijo)

            cursor.close()
            conn.close()

            primer_fee= fee_fijo[0] if fee_fijo else None
            primer_producto_cia = producto_cia_fijo[0] if producto_cia_fijo else None
            meses =['-']
            primer_mes = meses[0] if meses else None
            

            #precios = consulta_resultados(sistema_seleccionado, tarifa_seleccionada, cia_seleccionada, metodo_seleccionado, primer_producto_cia, primer_fee, primer_mes)
            ######
            resultado_json = {'cia':cia_fijo,'fee': fee_fijo, 'producto_cia':producto_cia_fijo}
            #resultado_json["precios"] = [transformar_precios(resultado_json["precios"][0])]
            
            # Convertir el diccionario a formato JSON
            json_resultado = json.dumps(resultado_json)
            # Retornar el JSON
            return json_resultado

        

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

#____________________________________________________________________________________________________________________________

@app.route('/cargar_precios', methods=['POST'])
def cargar_precios():
    sistema_seleccionado = request.args.get('sistema') 
    tarifa_seleccionada = request.args.get('tarifa') 
    cia_seleccionada = request.args.get('cia') 
    metodo_seleccionado = request.args.get('metodo') 
    producto_cia_seleccionada = request.args.get('producto_cia') 
    fee_seleccionado = request.args.get('fee')
    mes_seleccionado = request.args.get('mes')    

    print("sistema_seleccionado:", sistema_seleccionado)
    print("tarifa_seleccionada:", tarifa_seleccionada)
    print("cia_seleccionada:", cia_seleccionada)
    print("metodo_seleccionado:", metodo_seleccionado)
    print("producto_cia_seleccionada:", producto_cia_seleccionada)
    print("fee_seleccionado:", fee_seleccionado)
    print("mes_seleccionado:", mes_seleccionado)


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
                    AND fee = '{fee_seleccionado}'
            """
            cursor.execute(consulta_datos)

            data = cursor.fetchall()
            print(data)
            cursor.close()  
            conn.close()

            resultado_json = {'precios': data}
            resultado_json["precios"] = [transformar_precios(resultado_json["precios"][0])]
            resultado_json["precios"][0]["PM1"] = 0
            resultado_json["precios"][0]["PM2"] = 0
            resultado_json["precios"][0]["PM3"] = 0
            resultado_json["precios"][0]["PM4"] = 0
            resultado_json["precios"][0]["PM5"] = 0
            resultado_json["precios"][0]["PM6"] = 0
            
            # Convertir el diccionario a formato JSON
            json_resultado = json.dumps(resultado_json)
            # Retornar el JSON
            return json_resultado

        elif metodo_seleccionado == 'INDEXADO':
            print("-----ENTRA_2-----")
            consulta_datos_energia = f"""
                SELECT p1_, p2_, p3_, p4_, p5_, p6_
                FROM precios_index_energia
                WHERE sistema = '{sistema_seleccionado}' 
                    AND tarifa = '{tarifa_seleccionada}' 
                    AND cia = '{cia_seleccionada}' 
                    AND fee = '{fee_seleccionado}'
                    AND mes = '{mes_seleccionado}'
                    
            """
            print(consulta_datos_energia)

            cursor.execute(consulta_datos_energia)

            data_energia = cursor.fetchall()

            consulta_datos_media = f"""
                SELECT 
                    AVG(p1_) AS media_p1,
                    AVG(p2_) AS media_p2,
                    AVG(p3_) AS media_p3,
                    AVG(p4_) AS media_p4,
                    AVG(p5_) AS media_p5,
                    AVG(p6_) AS media_p6
                FROM precios_index_energia
                WHERE 
                    sistema = '{sistema_seleccionado}' 
                    AND tarifa = '{tarifa_seleccionada}' 
                    AND cia = '{cia_seleccionada}' 
                    AND fee = '{fee_seleccionado}'
                    AND mes BETWEEN 
                        (DATE '{mes_seleccionado}' - INTERVAL '11 months') AND DATE '{mes_seleccionado}'"""


            cursor.execute(consulta_datos_media)

            data_energia_media = cursor.fetchall()

            consulta_datos_potencia = f"""
                SELECT p1, p2, p3, p4, p5, p6
                FROM precios_index_potencia
                WHERE sistema = '{sistema_seleccionado}' 
                    AND tarifa = '{tarifa_seleccionada}' 
                    AND cia = '{cia_seleccionada}'
                    AND producto_cia = '{producto_cia_seleccionada}'
                    
            """
            print(consulta_datos_potencia)
            cursor.execute(consulta_datos_potencia)

            data_potencia = cursor.fetchall()

            cursor.close()  
            conn.close()

            print("data_energia: ", data_energia)
            print("data_potencia: ", data_potencia)
            print("data_energia_media:", data_energia_media)
            data_total = [data_energia[0] + data_potencia[0] + data_energia_media[0]]
            
            resultado_json = {'precios': data_total}
            resultado_json["precios"] = [transformar_precios(resultado_json["precios"][0])] 
            
            # Convertir el diccionario a formato JSON
            json_resultado = json.dumps(resultado_json)
            
            # Retornar el JSON
            return  json_resultado

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

#____________________________________________________________________________________________________________________________

@app.route('/descargar_pdf', methods=['GET'])
def descargar_pdf():
    # Generar el PDF en memoria
    buffer = BytesIO()
    c = canvas.Canvas(buffer)
    # Head izquierda
    c.setFont("Helvetica", 11)
    c.setFillColor(colors.gray)
    #c.drawImage("captura_logo_final.png", 160, 740, width=250, height=100)
    c.drawString(40, 730, "Cliente: NOMBRE CLIENTE")
    c.drawString(40, 715, "Dirección: DIRECCIÓN CLIENTE")
    c.drawString(40, 700, "CUPS: NÚMERO CUPS")
    # Head derecha
    #
    c.drawString(375, 730, "Asesor: NOMBRE ASESOR")
    c.drawString(375, 715, "Contacto: NÚMERO ASESOR")
    c.drawString(375, 700, "Delegación: LOCALIDAD")
    c.setFillColor(colors.black)
    ####
    # Tail
    c.setStrokeColorRGB(0.7, 0.7, 0.7) #LÍNEA tail
    c.line(50, 50, 550, 50)
    c.setFont("Helvetica", 8)
    c.setFillColor(colors.gray)
    c.drawString(50, 35, "Válido por 7 días. Documentación necesaria para modificar la propuesta: - DNI titular   - CIF empresa - Copia Facturas   - Recibo bancario")
    # Franja horizontal gris claro con opacidad baja
    #Color
    c.setFillColorRGB(0.9, 0.9, 0.9)  # Color gris claro
    c.setStrokeColorRGB(0.9, 0.9, 0.9)  # Color de borde igual al de relleno para evitar contorno visible
    # Forma
    c.rect (0, 663, 600, 20, 0, fill=1)
    # Restaurar el color de relleno y borde a valores no transparentes
    c.setFillColorRGB(0, 0, 0)
    c.setFont("Helvetica", 16)
    # Título
    c.drawString(140, 668, "Oferta de contratación de suministro eléctrico")
    # Ahorro ¿?
    c.setFont("Helvetica", 12)
    c.drawString(130, 642, "Ahorro actual")
    c.drawString(385, 642, "Ahorro anual")
    #
    c.setStrokeColorRGB(0, 0, 0) # Color del borde
    c.setLineWidth(1) #Grosor de la línea
    c.roundRect (85,592, 160, 40, 11,fill=0)
    c.roundRect (340,592, 160, 40, 11, fill=0)
    # Círculos verdes porcentaje
    c.setFillColorRGB(0.5, 0.8, 0.2)
    c.setStrokeColorRGB(0.5, 0.8, 0.2)
    c.circle(115, 611, 15, fill=1)
    c.circle(375, 611,15, fill=1)
    # Texto porcentaje
    c.setFillColorRGB(1.0, 1.0, 1.0)
    c.setStrokeColorRGB(1.0, 1.0, 1.0)
    c.drawString(100, 606, "VARIABLE PORCENTAJE AHORRO")
    c.drawString(360, 606, "VARIABLE PORCENTAJE AHORRO%")
    #
    c.setFillColorRGB(0.0, 0.0, 0.0)
    c.setStrokeColorRGB(0.0, 0.0, 0.0)
    c.setFont("Helvetica", 16)
    c.drawString(150,605, "AHORRO €")
    c.drawString(410, 605, "100,00€")
    # OFERTA SEVERAL
    # Franja horizontal
    c.setFillColorRGB(0.9, 0.9, 0.9)  # Color gris claro
    c.setStrokeColorRGB(0.9, 0.9, 0.9)  # Color de borde igual al de relleno para evitar contorno visible
    # Forma
    c.rect (0, 550, 600, 20, 0, fill=1)
    # Restaurar el color de relleno y borde a valores no transparentes
    c.setFillColorRGB(0, 0, 0)
    c.setFont("Helvetica", 16)
    c.drawString(230, 555, "Oferta Several")
    c.setFont("Helvetica", 12)
    c.drawString(50,525,"Compañía:")
    c.drawString(132,525,"VAR COMPAÑIA")
    c.drawString(290,525,"Tarifa:")
    c.drawString(340,525,"VAR TARIFA")
    c.setStrokeColorRGB(0.4, 0.4, 0.4) #LÍNEA TABLA
    c.line(50, 493, 545, 493)
    # VAR = variable a sustituir
    # Datos variables
    datos_oferta_several = [
        [" ","P1", "P2", "P3", "P4", "P5", "P6"],
        ["Precio energía (mes) (€/kWh)", "VAR mes p1", "VAR mes p2", "VAR mes p3", "VAR mes p4", "VAR mes p5", "VAR mes p6"],
        ["Precio energía media (€/kWh)", "VAR media p1", "VAR media p2", "VAR media p3", "VAR media p4", "VAR media p5", "VAR media p6"],
        ["Precio potencia media (€/kWh)", "VAR potenc1", "VAR potenc2", "VAR potenc3", "VAR potenc4", "VAR potenc5", "VAR potenc6"]
    ]
    c.setFont("Helvetica", 10)
    c.setFillColor(colors.gray)
    c.drawString(50,420,"Energía reactiva:")
    c.drawString(128,420,"VAR reactiva")
    c.drawString(200,420,"Alquiler equipo:")
    c.drawString(270,420,"VAR equipo")
    c.drawString(340,420,"Impuestos:")
    c.drawString(390,420,"VAR impuestos")
    c.drawString(475,420,"Otros:")
    c.drawString(505,420,"VAR otros")
    #
    c.setFont("Helvetica", 12)
    c.setFillColor(colors.black)
    c.drawString(50,380,"Total factura:")
    c.drawString(125,380,"VAR factura")
    c.drawString(50,365,"Total anual estimado:")
    c.drawString(170,365,"VAR estimado")
    #
    c.setFont("Helvetica", 8)
    c.setFillColor(colors.gray)
    c.drawString(50, 335, "*La estimación anual ha sido realizada utilizando datos históricos de consumo energético\
    publicados en SIPS en el último año y considerando la")
    c.drawString(50, 327,"proyección anual del perfil de consumo, \
    así como los precios facilitados por el cliente en su última factura de luz.")
    #OFERTA DISTRIBUIDORA ACTUAL
    # Franja horizontal
    c.setFillColorRGB(0.9, 0.9, 0.9)  # Color gris claro
    c.setStrokeColorRGB(0.9, 0.9, 0.9)  # Color de borde igual al de relleno para evitar contorno visible
    # Forma
    c.rect (0, 290, 600, 20, 0, fill=1)
    c.setFillColorRGB(0, 0, 0)# Restaura color
    c.setFont("Helvetica", 16)
    c.drawString(190, 295, "Oferta de Distribuidora Actual")
    c.setFont("Helvetica", 12)
    c.drawString(50,265,"Compañía:")
    c.drawString(132,265,"VAR COMPAÑIA")
    c.drawString(290,265,"Tarifa:")
    c.drawString(340,265,"VAR TARIFA")
    c.setStrokeColorRGB(0.4, 0.4, 0.4)
    c.line(50, 233, 550, 233)
    # Factura Several, tabla pequeña 1
    factura_several = [
    [" ","Factura Actual", "Anual"],
        ["Total Potencia", "VarPotAct1", "VarPotAn1"],
        ["Total Energía", "VarEnAct1", "VarEnAn1"]
    ]
    datos_distribuidora_actual = [
    [" ","P1", "P2", "P3", "P4", "P5", "P6"],
        ["Precio energía (mes) (€/kWh)", "VAR mes p1", "VAR mes p2", "VAR mes p3", "VAR mes p4", "VAR mes p5", "VAR mes p6"],
        ["Precio energía media (€/kWh)", "VAR media p1", "VAR media p2", "VAR media p3", "VAR media p4", "VAR media p5", "VAR media p6"],
        ["Precio potencia media (€/kWh)", "VAR potenc1", "VAR potenc2", "VAR potenc3", "VAR potenc4", "VAR potenc5", "VAR potenc6"]
    ]
    c.setFont("Helvetica", 10)
    c.setFillColor(colors.gray)
    c.drawString(50,160,"Energía reactiva:")
    c.drawString(128,160,"VAR reactiva")
    c.drawString(200,160,"Alquiler equipo:")
    c.drawString(270,160,"VAR equipo")
    c.drawString(340,160,"Impuestos:")
    c.drawString(390,160,"VAR impuestos")
    c.drawString(475,160,"Otros:")
    c.drawString(505,160,"VAR otros")
    #
    c.setFont("Helvetica", 12)
    c.setFillColor(colors.black)
    c.drawString(50,120,"Total factura:")
    c.drawString(125,120,"VAR factura")
    c.drawString(50,105,"Total anual estimado:")
    c.drawString(170,105,"VAR estimado")
    #
    c.setFont("Helvetica", 8)
    c.setFillColor(colors.gray)
    c.drawString(50, 75, "*La estimación anual ha sido realizada utilizando datos históricos de consumo energético\
    publicados en SIPS en el último año y considerando la")
    c.drawString(50, 67,"proyección anual del perfil de consumo, \
    así como los precios facilitados por el cliente en su última factura de luz.")
    #Datos factura actual, tabla pequeña:
    datos_factura_actual = [
    [" ","Factura Actual", "Anual"],
        ["Total Potencia", "VarPotAct2", "VarPotAn2"],
        ["Total Energía", "VarEnAct2", "VarEnAn2"]
    ]
    # Definir el estilo de las tablas
    estilo = TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.transparent),
        ("ALIGN", (0, -1), (-1, -1), "CENTER"),
        ("BOX", (0, 0), (-1, -1), 0.25, colors.transparent),
        ("INNERGRID", (0, 0), (-1, -1), 0.10, colors.transparent),
        ("FONTSIZE", (0, 0), (-1, -1), 8)  # Ajusta el tamaño de fuente a 8 puntos
    ])
    estilo2 = TableStyle([
        ("LEADING", (0, 0), (-1, -1), 10),
        ("BACKGROUND", (0, 0), (-1, 0), colors.transparent),
        ("ALIGN", (0, -1), (-1, -1), "LEFT"),
        ("BOX", (0, 0), (-1, -1), 0.25, colors.transparent),
        ("INNERGRID", (0, -1), (0, -1), 0.10, colors.black),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
        ("FONTSIZE", (0, 0), (-1, 0), 10)
    ])
    # Crear las instancias de la clase Table
    tabla_several = Table(datos_oferta_several, style=estilo2)
    tabla_actual = Table(datos_distribuidora_actual, style=estilo2)
    ancho_disponible = 595 - 2 * 50  # 2 márgenes de 20 puntos cada uno
    alto_disponible = 842 - 2 * 20  # 2 márgenes de 20 puntos cada uno
    # Tabla pequeña
    tabla_factura_several = Table(factura_several, style=estilo2)
    tabla_factura_actual = Table(datos_factura_actual, style = estilo2)
    # Dibujo de las tablas en el documento
    tabla_several.wrapOn(c, 400, 200)
    tabla_several.drawOn(c, 50, 445)
    tabla_actual.wrapOn(c, ancho_disponible, 200)
    tabla_actual.drawOn(c, 50, 185)
    ##
    tabla_factura_several.wrapOn(c, 200, 50)
    tabla_factura_several.drawOn(c, 360, 360)
    tabla_factura_actual.wrapOn(c, 200, 50)
    tabla_factura_actual.drawOn(c, 360, 100)
    # Líneas tablas pequeñas
    c.setStrokeColorRGB(0.7, 0.7, 0.7) #LÍNEA tail
    c.setFillColor(colors.gray)
    c.line(415, 392, 535, 392)
    c.line(415, 132, 535, 132)
    # Guardar los cambios en el documento
    c.save()
    # Mover el puntero al principio del buffer antes de enviar el archivo
    buffer.seek(0)
    # Descargar el PDF como un archivo adjunto
    return send_file(buffer, as_attachment=True, download_name='pdf2.5.pdf')
    
# Nueva ruta para manejar la consulta a la tabla precios_fijo
#@app.route('/consulta_resultados', methods=['POST'])

@app.route("/cups", methods=['POST'])
def tu_endpoint():
    try:
        # Obtener el dato del CUPS desde la solicitud POST
        data = request.get_json()
        cups = data['cups']

        def webscraping (num_cup):
            #directorio_actual = os.path.dirname(os.path.abspath(__file__))
            #chromedriver_path = os.path.join(directorio_actual, 'chromedriver.exe')
            #service = Service(executable_path=chromedriver_path)
            
            options = webdriver.ChromeOptions()
            options.add_argument('--headless')
            
            
            driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
            

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
            wait = WebDriverWait(driver, 10)  

            enlace_sips = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'a[href="#/sips"]')))

            # Haz clic en el enlace usando JavaScript
            driver.execute_script("arguments[0].click();", enlace_sips)
            
            # Encuentra el campo de entrada por su ID (puedes usar otro selector según sea necesario)
            
            campo_input = wait.until(EC.presence_of_element_located((By.ID, 'input_6')))
            
            # Ingresa el número deseado en el campo
            campo_input.send_keys(num_cup)

            # Puedes también enviar una tecla "Enter" para confirmar el ingreso del número (opcional)
            campo_input.send_keys(Keys.RETURN)
            
            # Encuentra el botón "Consultar" por su clase (puedes usar otro selector según sea necesario)
            boton_consultar = wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'md-raised')))

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
            
            # json_resultado = json.dumps(datos_json)

            return datos_json

        # Llamar a la funcion de webscraping
        resultado_cups = webscraping(cups)
        

        # Devolver el resultado como JSON
        return jsonify(resultado_cups)

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
