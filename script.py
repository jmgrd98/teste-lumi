import os
import psycopg2
import re
from pdfminer.high_level import extract_text
import os
import psycopg2
import re
import pdfplumber
from pdfminer.high_level import extract_text

def extract_table_data(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        all_text = []
        for page in pdf.pages:
            table = page.extract_table()
            if table:
                all_text.extend(table)
        return all_text
        

def extract_data_from_pdf(pdf_path):
    global id
    table_data = extract_table_data(pdf_path)
    # print(table_data)

    text = extract_text(pdf_path)

    lines = text.split('\n')
    print(text)

    numero_cliente = None
    mes_referencia = None
    energia_eletrica_quantidade = None
    energia_eletrica_valor = None
    energia_scee_quantidade = None
    energia_scee_valor = None
    energia_compensada_quantidade = None
    energia_compensada_valor = None
    contrib_ilum_publica = None

    # for row in table_data:
    #         if row:  # Check if row is not None
    #             if row[0] and "Energia Elétrica" in row[0]:
    #                 print('ROW', row)
    #                 energia_eletrica_quantidade = row[2]
    #                 energia_eletrica_valor = row[3]
    #             # Additional logic for other rows
    #             if row[0] and "Contrib Ilum Publica Municipal" in row[0]:
    #                 try:
    #                     contrib_ilum_publica = float(row[3].replace(',', '.'))
    #                 except ValueError as e:
    #                     print(f"Error extracting Contrib Ilum Publica data: {e}")



    for i in range(len(lines)):
        if "Nº DO CLIENTE" in lines[i]:
            if i + 1 < len(lines):
                numero_cliente_line = lines[i + 1].strip()
                numero_cliente = numero_cliente_line.split()[0]

        elif "Referente a" in lines[i]:
            mes_referencia = lines[i + 1].strip()
            match = re.search(r'\b([A-Za-z]{3}/\d{4})\b', mes_referencia)
            if match:
                mes_referencia = match.group(1)
            else:
                mes_referencia = None

        elif "Energia Elétrica" in lines[i]:
            try:
                if i + 10 < len(lines) and i + 14 < len(lines):
                    quantidade_str = lines[i + 10].replace(',', '.').replace(' ', '')
                    valor_str = lines[i + 14].replace(',', '.').replace(' ', '')
                    if id == 8:
                        quantidade_str = lines[i + 11].replace(',', '.').replace(' ', '')
                        valor_str = lines[i + 15].replace(',', '.').replace(' ', '')
                    if quantidade_str and valor_str:
                        energia_eletrica_quantidade = float(quantidade_str)
                        energia_eletrica_valor = float(valor_str)
                        break
            except ValueError as e:
                print(f"Conversion error: {e}")

        elif "Energia SCEE s/ ICMS" in lines[i]:
            try:
                if i + 10 < len(lines) and i + 14 < len(lines):
                    quantidade_str = lines[i + 10].replace(',', '.').replace(' ', '')
                    valor_str = lines[i + 14].replace(',', '.').replace(' ', '')
                    if id == 8:
                        quantidade_str = lines[i + 11].replace(',', '.').replace(' ', '')
                        valor_str = lines[i + 15].replace(',', '.').replace(' ', '')
                    if quantidade_str and valor_str:
                        energia_scee_quantidade = float(quantidade_str)
                        energia_scee_valor = float(valor_str)
            except ValueError as e:
                print(f"Error extracting Energia SCEE data: {e}")

        elif "Energia compensada GD I" in lines[i]:
            try:
                if i + 10 < len(lines) and i + 14 < len(lines):
                    quantidade_str = lines[i + 10].replace(',', '.').replace(' ', '')
                    valor_str = lines[i + 14].replace(',', '.').replace(' ', '')
                    if id == 8:
                        quantidade_str = lines[i + 11].replace(',', '.').replace(' ', '')
                        valor_str = lines[i + 15].replace(',', '.').replace(' ', '')
                    if quantidade_str and valor_str:
                        energia_compensada_quantidade = float(quantidade_str)
                        energia_compensada_valor = float(valor_str)
            except ValueError as e:
                print(f"Error extracting Energia compensada data: {e}")

        elif "Contrib Ilum Publica Municipal" in lines[i]:
            try:
                if i + 15 < len(lines):
                    contrib_ilum_publica = float(lines[i + 15].replace(',', '.').replace(' ', ''))
                    if id == 8:
                        contrib_ilum_publica = float(lines[i + 16].replace(',', '.').replace(' ', ''))
            except ValueError as e:
                print(f"Error extracting Contrib Ilum Publica data: {e}")


    return (numero_cliente, mes_referencia, energia_eletrica_quantidade, energia_eletrica_valor, energia_scee_quantidade, energia_scee_valor, energia_compensada_quantidade, energia_compensada_valor, contrib_ilum_publica)


def insert_into_postgres(data):
    connection = psycopg2.connect(
        user="postgres",
        password="root",
        host="localhost",
        port="5432",
        database="lumi"
    )

    cursor = connection.cursor()

    try:
        insert_query = "INSERT INTO faturas (id, numero_cliente, mes_referencia, energia_eletrica_quantidade, energia_eletrica_valor, energia_scee_quantidade, energia_scee_valor, energia_compensada_quantidade, energia_compensada_valor, contrib_ilum_publica) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"

        cursor.execute(insert_query, data)

        connection.commit()
    except Exception as e:
        connection.rollback()
        print(f"Error: {e}")
    finally:
        cursor.close()
        connection.close()

id = 0
def process_pdfs(pdf_folder):
    global id
    for filename in os.listdir(pdf_folder):
        id += 1
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(pdf_folder, filename)
            
            data = extract_data_from_pdf(pdf_path)

            if data:
                data_with_id = (id,) + data
                insert_into_postgres(data_with_id)

if __name__ == "__main__":
    pdf_folder = "./faturas"
    process_pdfs(pdf_folder)
