from selenium import webdriver
import requests
import os
from selenium.webdriver.support  import ui
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.select import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from dotenv import load_dotenv
import pandas as pd
load_dotenv(os.getenv('ENV'))
def load_page(self):
    self.driver.get(self.url)
def page_is_loaded(browser):
    return browser.find_element_by_id("state") != None
browser = webdriver.Chrome(os.getenv('CHROME_DRIVER'))
def page_is_loaded1(browser):
    return browser.find_element_by_id("county") != None
elem= browser.get(os.getenv('URL'))
browser.implicitly_wait(20)
wait=ui.WebDriverWait(browser,20)
wait.until(page_is_loaded)
browser.maximize_window()
browser.find_element_by_xpath("//span[@id='select2-state-container']").click()
browser.find_element_by_xpath("//input[@class='select2-search__field']").send_keys(os.getenv('STATE'))
browser.find_element_by_xpath("//input[@class='select2-search__field']").send_keys(Keys.ENTER)
browser.implicitly_wait(20)
wait=ui.WebDriverWait(browser,20)
wait.until(page_is_loaded1)
browser.find_element_by_xpath("//span[@id='select2-county-container']").click()
browser.find_element_by_xpath("//input[@class='select2-search__field']").send_keys("All")
browser.find_element_by_xpath("//input[@class='select2-search__field']").send_keys(Keys.ENTER)

result_div=browser.find_elements_by_class_name('result_box')
links = []
address = []
data = []
name = []
phone = []
div =[]
description =[]
for r in result_div:
    try:
        address=r.text
        if address != '' : 
            data.append({"full_address":address})     
    except:
        continue

df=pd.DataFrame(data)
print(df)
df.to_csv('data.csv')
browser.quit()

