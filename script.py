import os
import psycopg2
import re
from pdfminer.high_level import extract_text

import os
import psycopg2
import re
from pdfminer.high_level import extract_text

def extract_data_from_pdf(pdf_path):

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


    for i in range(len(lines)):
        if "Nº DO CLIENTE" in lines[i]:
            if i + 1 < len(lines):
                numero_cliente_line = lines[i + 1].strip()
                # print(f"Line after Nº DO CLIENTE: {numero_cliente_line}")

                numero_cliente = "".join(numero_cliente_line.split())
                # print(f"Extracted numero_cliente as string: {numero_cliente}")

        elif "Referente a" in lines[i]:
            mes_referencia = lines[i + 1].strip()
            match = re.search(r'\b([A-Za-z]{3}/\d{4})\b', mes_referencia)
            if match:
                mes_referencia = match.group(1)
            else:
                mes_referencia = None

        elif "Energia Elétrica" in lines[i]:
            try:
                # Ensure there are enough lines following the current line
                if i + 10 < len(lines) and i + 14 < len(lines):
                    # Process and print the extracted strings
                    quantidade_str = lines[i + 10].replace(',', '.').replace(' ', '')
                    valor_str = lines[i + 14].replace(',', '.').replace(' ', '')

                    # Check if strings are not empty
                    if quantidade_str and valor_str:
                        energia_eletrica_quantidade = float(quantidade_str)
                        energia_eletrica_valor = float(valor_str)
                        print(f"Energia Elétrica Quantidade: {energia_eletrica_quantidade}, Valor: {energia_eletrica_valor}")
                        # Break out of the loop after successful extraction
                        break

            except ValueError as e:
                print(f"Conversion error: {e}")

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

def process_pdfs(pdf_folder):
    id = 0
    for filename in os.listdir(pdf_folder):
        id = id + 1
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(pdf_folder, filename)
            
            data = extract_data_from_pdf(pdf_path)

            if data:
                data_with_id = (id,) + data
                insert_into_postgres(data_with_id)

if __name__ == "__main__":
    pdf_folder = "C:/Users/Zello/Downloads/Faturas - Teste Prático"
    process_pdfs(pdf_folder)
