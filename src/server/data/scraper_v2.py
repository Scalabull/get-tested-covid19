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
data = []
load_dotenv(os.getenv('ENV'))
def load_page(self):
    self.driver.get(self.url)
STATE_LIST =['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
browser = webdriver.Chrome(os.getenv('CHROME_DRIVER'))
elem= browser.get(os.getenv('URL'))
browser.maximize_window()
for i in STATE_LIST:
    def page_is_loaded(browser):
        return browser.find_element_by_id("state") != None
    wait=ui.WebDriverWait(browser,20)
    wait.until(page_is_loaded)
    browser.find_element_by_xpath("//span[@id='select2-state-container']").click()
    browser.find_element_by_xpath("//input[@class='select2-search__field']").send_keys(i)
    browser.find_element_by_xpath("//input[@class='select2-search__field']").send_keys(Keys.ENTER)
    wait = WebDriverWait(browser, 30, poll_frequency=5, ignored_exceptions=['ElementNotVisibleException','ElementNotSelectableException','NoSuchElementException'])
    element = wait.until(EC.element_to_be_clickable((By.XPATH, "//span[@id='select2-county-container']")))
    browser.find_element_by_xpath("//span[@id='select2-county-container']").click()
    browser.find_element_by_xpath("//input[@class='select2-search__field']").send_keys("All")
    browser.find_element_by_xpath("//input[@class='select2-search__field']").send_keys(Keys.ENTER)
    result_div=browser.find_elements_by_class_name('result_box')
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


