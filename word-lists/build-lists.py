import requests
from bs4 import BeautifulSoup
import beautifultable


def printLinksMarkdownTable(links):
    for link in links:
        print(link.text + ' | ' + link.get('href'))


def getPuzzleLink(newName, newLink):
    puzzleLink = {
        "name": newName,
        "link": newLink
    }

    return puzzleLink


def getPuzzle(name, link, words):
    puzzle = {
        "name": name,
        "link": link,
        "words": words
    }

    return puzzle



def getPuzzleData(puzzle):
    response = requests.get(puzzle['link'])
    soup = BeautifulSoup(response.text, 'html.parser')


    table = soup.find_all("table", class_="defaulttable")
    innerTable = table[0].table
    tds = innerTable.find_all('td')

    words = []

    for td in tds:
        word = td.get_text().strip().replace(' ', '')
        words.append(word)


    data = {
        "name": puzzle['name'],
        "link": puzzle['link'],
        "words": words,
    }

    return data


def writePuzzleToFile(puzzle):
    # fileName = puzzle['name'].replace(' ', '-').lower() + '.txt'

    fileName = getTextFileOutput(puzzle['name'])
    
    with open(fileName, 'w') as file:
        for word in puzzle['words']:
            # print(word)
            file.write(word + "\n")


def getTextFileOutput(name):
    return name.replace(' ', '-').lower() + '.txt'


URL    = 'https://www.thesprucecrafts.com/free-hard-word-searches-1357162'
UL_ID1 = 'mntl-sc-block_2-0-3'
UL_ID2 = 'mntl-sc-block_2-0-7'
UL_ID3 = 'mntl-sc-block_2-0-11'

puzzleLinks = []    # list of names and links
masterList  = []    # list of puzzles (name, link, list of words)

# get the html doc text
response = requests.get(URL)
soup = BeautifulSoup(response.text, 'html.parser')

# get first list of links
ul = soup.find(id=UL_ID1)
for a in ul.find_all('a'):
    newPuzzleLink = getPuzzleLink(a.text, a.get('href'))

    if newPuzzleLink['link'].startswith('http://www.whenwewordsearch.com'):
        puzzleLinks.append(newPuzzleLink)


# second list of links
ul = soup.find(id=UL_ID2)
for a in ul.find_all('a'):
    newPuzzleLink = getPuzzleLink(a.text, a.get('href'))
    if newPuzzleLink['link'].startswith('http://www.whenwewordsearch.com'):
        puzzleLinks.append(newPuzzleLink)

# third list of links
ul = soup.find(id=UL_ID3)
for a in ul.find_all('a'):
    newPuzzleLink = getPuzzleLink(a.text, a.get('href'))
    if newPuzzleLink['link'].startswith('http://www.whenwewordsearch.com'):
        puzzleLinks.append(newPuzzleLink)

# get the words located from each puzzle link
for p in puzzleLinks:
    masterList.append(getPuzzleData(p))

# write the words into a text file for each puzzle
for x in masterList:
    writePuzzleToFile(x)

# generate the master table file: MASTER-TABLE.md
with open('README.md', 'w') as masterFile:
    masterFile.write('List | File Name | Word Count | Source\n')
    masterFile.write(':--- | :--- | :--- | :--- \n')

    for x in masterList:

        # puzzle name
        masterFile.write(x['name'] + ' | ')

        # puzzle list file name
        innerFileName = getTextFileOutput(x['name'])
        textFile = '[' + innerFileName + '](' + innerFileName + ')'
        masterFile.write(textFile + ' | ')

        # number of words in the puzzle
        count = len(x['words'])
        masterFile.write(str(count) + ' | ')

        # link to the source
        mdSource = '[:link:](' + x['link'] + ')'
        masterFile.write(mdSource + ' \n ')