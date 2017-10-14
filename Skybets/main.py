import requests
from bs4 import BeautifulSoup
import json


def GetRequest():


	f = open("the_entire_skybets_website.json", 'r')
	calcio = json.load(f)
	f.close()
	# this section of code opens up pandoras box
	length = len(calcio['data']['types']) # gets how many football games there are
	for i in range(0, length):
		print(calcio['data']['types'][i]) # prints each football game




GetRequest()