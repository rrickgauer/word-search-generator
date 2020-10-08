import mysql.connector
import argparse
import getpass
from os import path
import json

def createNewConfigFile():
    configFileUserInput = {
        "user"     : input('User: '),
        "host"     : input('Host: '),
        "database" : input('Database: '),
        "passwd"   : getpass.getpass(),
    }

    jsonString = json.dumps(configFileUserInput)
    with open(DATABASE_CONFIG_FILE, "w") as newConfigFile:
        newConfigFile.write(jsonString)

# return the data from the local .tables.config file
def getConfigData():
    with open(DATABASE_CONFIG_FILE) as configFile:
        configData = json.loads(configFile.read())
        return configData




###############################################################################
###############################################################################
#                               MAIN
###############################################################################
###############################################################################


DATABASE_CONFIG_FILE = '.mysql-info.json'

# assign command line arguments
parser = argparse.ArgumentParser(description="Add a new list of words to the word search generator")
parser.add_argument('-n', '--name', nargs="+", help="Name of the new list")
parser.add_argument('-f', '--file', nargs=1, help="Text file name of the list of words")
args = parser.parse_args()



# create new config file if one does not exist in the local directory
if not path.exists(DATABASE_CONFIG_FILE):
    createNewConfigFile()

# connect to database
configData = getConfigData()
mydb = mysql.connector.connect(**configData)
mycursor = mydb.cursor()



# build the name
name = ''
for x in args.name:
    name += x + ' '

name = name.strip()

# build stmt
sql = "INSERT INTO Lists (name) values ('{}')"
sql = sql.format(name)


# insert the new list name
mycursor.execute(sql)
mydb.commit()

# retrieve the id of the new list
sql = "SELECT id from Lists where name = '{}' LIMIT 1"
sql = sql.format(name)
mycursor.execute(sql)
result = mycursor.fetchall()
listID = result[0][0]



fileName = args.file[0]
words = []

with open(fileName, 'r') as file:
    for line in file:
        words.append(line.strip().upper().replace("\n", '').replace(' ', '').replace('-', ''))


sql = "INSERT into Words (list_id, word) values "

for word in words:
    newSql = " ({}, '{}'),"
    newSql = newSql.format(listID, word)
    sql += newSql 

sql = sql.rstrip(',')

mycursor.execute(sql)
mydb.commit()
print(mycursor.rowcount, "words inserted.")