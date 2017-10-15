import json
import random
country = """
Afghanistan
Albania
Algeria
Andorra
Angola
Antigua & Deps
Argentina
Armenia
Australia
Austria
Azerbaijan
Bahamas
Bahrain
Bangladesh
Barbados
Belarus
Belgium
Belize
Benin
Bhutan
Bolivia
Bosnia Herzegovina
Botswana
Brazil
Brunei
Bulgaria
Burkina
Burundi
Cambodia
Cameroon
Canada
Cape Verde
Central African Rep
Chad
Chile
China
Colombia
Comoros
Congo
Congo {Democratic Rep}
Costa Rica
Croatia
Cuba
Cyprus
Czech Republic
Denmark
Djibouti
Dominica
Dominican Republic
East Timor
Ecuador
Egypt
El Salvador
Equatorial Guinea
Eritrea
Estonia
Ethiopia
Fiji
Finland
France
Gabon
Gambia
Georgia
Germany
Ghana
Greece
Grenada
Guatemala
Guinea
Guinea-Bissau
Guyana
Haiti
Honduras
Hungary
Iceland
India
Indonesia
Iran
Iraq
Ireland {Republic}
Israel
Italy
Ivory Coast
Jamaica
Japan
Jordan
Kazakhstan
Kenya
Kiribati
Korea North
Korea South
Kosovo
Kuwait
Kyrgyzstan
Laos
Latvia
Lebanon
Lesotho
Liberia
Libya
Liechtenstein
Lithuania
Luxembourg
Macedonia
Madagascar
Malawi
Malaysia
Maldives
Mali
Malta
Marshall Islands
Mauritania
Mauritius
Mexico
Micronesia
Moldova
Monaco
Mongolia
Montenegro
Morocco
Mozambique
Myanmar, {Burma}
Namibia
Nauru
Nepal
Netherlands
New Zealand
Nicaragua
Niger
Nigeria
Norway
Oman
Pakistan
Palau
Panama
Papua New Guinea
Paraguay
Peru
Philippines
Poland
Portugal
Qatar
Romania
Russian Federation
Rwanda
St Kitts & Nevis
St Lucia
Saint Vincent & the Grenadines
Samoa
San Marino
Sao Tome & Principe
Saudi Arabia
Senegal
Serbia
Seychelles
Sierra Leone
Singapore
Slovakia
Slovenia
Solomon Islands
Somalia
South Africa
South Sudan
Spain
Sri Lanka
Sudan
Suriname
Swaziland
Sweden
Switzerland
Syria
Taiwan
Tajikistan
Tanzania
Thailand
Togo
Tonga
Trinidad & Tobago
Tunisia
Turkey
Turkmenistan
Tuvalu
Uganda
Ukraine
United Arab Emirates
United Kingdom
United States
Uruguay
Uzbekistan
Vanuatu
Vatican City
Venezuela
Vietnam
Yemen
Zambia
Zimbabwe
"""
country = country.split("\n")
counter = 0
for i in country:
	if i == "":
		country.pop(counter)
	counter += 1#



def main():
	arr = []
	for i in country:
		teams = gen_team_name(country)
		try:
			game_name = teams[0] + " vs " + teams[1]
		except TypeError as e:
			continue
		home = teams[0]
		away = teams[1]
		home_win = str(round((random.uniform(1.1, 5.0)), 2))
		home_draw = str(round((random.uniform(1.1, 5.0)), 2))
		home_lose = str(round((random.uniform(1.1, 5.0)), 2))


		json_generate = [{
		"country": home,
		"data": [{
				"game_name": game_name,
				"home": home,
				"Away": away,
				"home_win": home_win,
				"home_draw": home_draw,
				"home_lose": home_lose
		}] } ]
		arr.append(json_generate)
		# print(json_generate)
	arr = json.dumps(arr, ensure_ascii=False)
	print(arr)





def gen_team_name(country):
	x = str(random.choice(country))
	y = str(random.choice(country))
	if x == y:
		gen_team_name(country)
	else:
		return([x, y])


main()
"""json_stuff = [{
		"country": Country,
		"data": [{
				"game_name": Game_name,
				"home": Country,
				"Away": Away,
				"Home_win": win,
				"home_draw": draw,
				"home_lose": lose
			}]"""