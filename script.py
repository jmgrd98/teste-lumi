import os
import psycopg2
import re
from pdfminer.high_level import extract_text, extract_pages
from pdfminer.layout import LTTextContainer

def convert_pdf_to_html(pdf_path):
    html_content = "<html><body>"
    
    for page_layout in extract_pages(pdf_path):
        for element in page_layout:
            if isinstance(element, LTTextContainer):
                html_content += "<p>"
                html_content += element.get_text()
                html_content += "</p>"
    
    html_content += "</body></html>"
    return html_content

def extract_data_from_pdf(pdf_path):
    text = extract_text(pdf_path)
    lines = text.split('\n')
    value1 = None
    value2 = None

    for line in lines:
        if "Nº DO CLIENTE" in line:
            value1_line = re.search(r'Nº DO CLIENTE.*?(\d+)', line)
            if value1_line:
                value1 = value1_line.group(1)

        elif "Referente a" in line:
            value2_match = re.search(r'Referente a\s+([A-Za-z]+/\d{4})', line)
            if value2_match:
                value2 = value2_match.group(1)

    value1 = int(value1) if value1 and value1.isdigit() else None
    return (value1, value2)

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
        insert_query = "INSERT INTO faturas (cliente, mes_referencia) VALUES (%s, %s);"
        cursor.execute(insert_query, data)
        connection.commit()
    except Exception as e:
        connection.rollback()
        print(f"Error: {e}")
    finally:
        cursor.close()
        connection.close()

def process_pdfs(pdf_folder):
    for filename in os.listdir(pdf_folder):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(pdf_folder, filename)
            data = extract_data_from_pdf(pdf_path)
            if data and all(data):
                insert_into_postgres(data)

            html_content = convert_pdf_to_html(pdf_path)
            output_html_path = os.path.splitext(pdf_path)[0] + '.html'
            with open(output_html_path, 'w', encoding='utf-8') as html_file:
                html_file.write(html_content)

if __name__ == "__main__":
    pdf_folder = "C:/Users/Zello/Downloads/Faturas - Teste Prático"
    process_pdfs(pdf_folder)
