import os
import psycopg2
import re
from pdfminer.high_level import extract_text

import os
import psycopg2
import re
from pdfminer.high_level import extract_text

def extract_data_from_pdf(pdf_path):
    # Use pdfminer to extract text from PDF
    text = extract_text(pdf_path)
    print(text)

    # Split the text into lines
    lines = text.split('\n')

    # Initialize variables to store extracted values
    value1 = None
    value2 = None

    # Iterate through each line to find relevant information
    for i in range(len(lines)):
        # Check if the line contains "Nº DO CLIENTE" and extract the number below it
        if "Nº DO CLIENTE" in lines[i]:
            value1= lines[i + 1].strip()
            # value1 = value1_line if value1_line.isdigit() else None

        # Check if the line contains "Referente a" and extract the number below it
        elif "Referente a" in lines[i]:
            value2_line = lines[i + 1].strip()
            match = re.search(r'\b([A-Za-z]{3}/\d{4})\b', value2_line)
            if match:
                value2 = match.group(1)
            else:
                value2 = None

    # Convert value1 to int if it's a digit
    value1 = int(value1) if value1 and value1.isdigit() else None

    return (value1, value2)


def insert_into_postgres(data):
    # Connect to PostgreSQL
    connection = psycopg2.connect(
        user="postgres",
        password="root",
        host="localhost",
        port="5432",
        database="lumi"
    )

    cursor = connection.cursor()

    try:
        # Modify the SQL statement based on your table structure
        insert_query = "INSERT INTO faturas (cliente, mes_referencia) VALUES (%s, %s);"

        # Execute the insert query for the single row of data
        cursor.execute(insert_query, data)

        # Commit the transaction
        connection.commit()
    except Exception as e:
        # Rollback the transaction in case of an exception
        connection.rollback()
        print(f"Error: {e}")
    finally:
        # Close the cursor and connection in the finally block
        cursor.close()
        connection.close()

def process_pdfs(pdf_folder):
    # Loop through all PDF files in the specified folder
    for filename in os.listdir(pdf_folder):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(pdf_folder, filename)
            
            # Extract data from the PDF
            data = extract_data_from_pdf(pdf_path)

            # Insert data into PostgreSQL
            if data:
                insert_into_postgres(data)

if __name__ == "__main__":
    pdf_folder = "C:/Users/Zello/Downloads/Faturas - Teste Prático"
    process_pdfs(pdf_folder)
