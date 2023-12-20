import os
import psycopg2
from pdfminer.high_level import extract_text

def extract_data_from_pdf(pdf_path):
    # Use pdfminer to extract text from PDF
    text = extract_text(pdf_path)
    # Add your logic to extract specific data from the text

def insert_into_postgres(data):
    # Connect to PostgreSQL
    connection = psycopg2.connect(
        user="your_username",
        password="your_password",
        host="your_host",
        port="your_port",
        database="your_database"
    )

    cursor = connection.cursor()

    # Modify the SQL statement based on your table structure
    insert_query = "INSERT INTO your_table (column1, column2, ...) VALUES (%s, %s, ...);"

    # Execute the insert query for each row of data
    for row in data:
        cursor.execute(insert_query, row)

    # Commit the transaction and close the connection
    connection.commit()
    cursor.close()
    connection.close()

def process_pdfs(pdf_folder):
    # Loop through all PDF files in the specified folder
    for filename in os.listdir(pdf_folder):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(pdf_folder, filename)
            data = extract_data_from_pdf(pdf_path)
            insert_into_postgres(data)

if __name__ == "__main__":
    pdf_folder = "C:/Users/Zello/Downloads/Faturas - Teste Prático"
    process_pdfs(pdf_folder)
