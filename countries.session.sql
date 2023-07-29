SELECT continents
FROM "Countries", json_array_elements_text(continents) AS continent
WHERE continent NOT IN ('Africa', 'Asia', 'Europe', 'South America', 'North America', 'Oceania', 'Antarctica');

