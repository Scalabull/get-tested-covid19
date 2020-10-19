# TO USE:
# Download ChromeDriver: https://sites.google.com/a/chromium.org/chromedriver/home
# Depending on your OS, you may need to enable ChromeDriver to run in your security settings (it's an app from an independent developer). 
# Do this by running the executable and making sure it starts up. If there are no errors, close the executable and proceed.

# Set CHROME_DRIVER_PATH to point to the downloaded executable
# Set GTC_SCRAPE_URL to an appropriate URL

from selenium import webdriver
import requests
import os
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.select import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from dotenv import load_dotenv
import csv

load_dotenv(os.getenv('ENV'))
PAGE_URL = os.getenv('GTC_SCRAPE_URL')
CHROME_DRIVER_BIN_PATH = os.getenv('CHROME_DRIVER_PATH')

def load_page(self):
    self.driver.get(self.url)

OUT_CSV_HEADER = ['NAME', 'FULL_ADDRESS', 'PHONE', 'URL', 'DESCRIPTION', 'HOURS', 'DRIVE_THRU', 'APPOINTMENT_REQUIRED','SCREEN_REQUIRED','PHYSICIAN_ORDER_REQUIRED','VERIFIED_BY_PHONE']
STATE_LIST = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

def init():
    print('Performing scraping on: ', PAGE_URL)
    browser = webdriver.Chrome(CHROME_DRIVER_BIN_PATH)
    elem = browser.get(PAGE_URL)
    browser.implicitly_wait(2)
    browser.maximize_window()
    return browser

def page_is_loaded(browser):
    return EC.element_to_be_clickable((By.XPATH, "//span[@id='select2-state-container']"))

def load_browser_page(browser, state_str):
    wait=WebDriverWait(browser,20)
    wait.until(page_is_loaded)

    browser.find_element_by_xpath("//span[@id='select2-state-container']").click()
    browser.find_element_by_xpath("//input[@class='select2-search__field']").send_keys(state_str)
    browser.find_element_by_xpath("//input[@class='select2-search__field']").send_keys(Keys.ENTER)

    wait = WebDriverWait(browser, 10)
    wait.until(EC.element_to_be_clickable((By.XPATH, "//span[@id='select2-county-container']")))

    browser.find_element_by_xpath("//span[@id='select2-county-container']").click()
    wait.until(EC.element_to_be_clickable((By.XPATH, "//input[@class='select2-search__field']")))

    browser.find_element_by_xpath("//input[@class='select2-search__field']").click()
    browser.find_element_by_xpath("//input[@class='select2-search__field']").send_keys("All")
    browser.find_element_by_xpath("//input[@class='select2-search__field']").send_keys(Keys.ENTER)

def extract_name(element):
    h2s = element.find_elements_by_xpath('.//h2')
    if(len(h2s) == 0):
        return ''
    
    return h2s[0].text

def extract_url(element):
    url = element.find_elements_by_xpath('.//h2/a')
    if(len(url) == 0):
        return '' 
    
    return url[0].get_attribute('href')

def extract_description(element):
    desc = element.find_elements_by_class_name('guidelines_text')
    if(len(desc) == 0):
        return ''
    
    return desc[0].text

def extract_addr_phone(element):
    match = element.find_elements_by_class_name('p-b-5')
    addr_str = ''
    phone_str = ''
    if(len(match) > 0):
        addr_str = match[0].text
    if(len(match) > 1):
        phone_str = match[1].text
    
    return addr_str, phone_str

def get_flags(element):
    match = element.find_elements_by_class_name('checked-content')
    app_req = ''
    screen_req = ''
    physician_order_req = ''

    for item in match:
        if item.text == 'Appointment Required':
            app_req = 'Yes'
        if item.text == 'Screening Required':
            screen_req = 'Yes'
        if item.text == 'Physician Order Required':
            screen_req = 'Yes'
    
    return app_req, screen_req, physician_order_req

def extract_drive_thru(element):
    match = element.find_elements_by_class_name('type-of-center')

    if(len(match) > 0 and 'Drive-thru' in match[0].text):
        return 'Yes'
    return 'No'

def extract_verification_info(element):
    match = element.find_elements_by_class_name('verified_text')

    for item in match:
        if 'Verified by phone' in item.text:
            return 'Yes'
    
    return 'No'

def get_hours(element):
    dropdown = element.find_elements_by_class_name('time_open')
    if(len(dropdown) ==0):
        return ''

    dropdown[0].click()
    match = element.find_elements_by_xpath(".//div[@class='open_days']/div")
    all_hours = []

    for item in match:
        day = item.find_elements_by_class_name('day-name')
        hours = item.find_elements_by_class_name('open-day')
        if(len(day) == 0 or len(hours) == 0):
            continue
        
        day_str = day[0].text
        hours_str = hours[0].text

        if(day_str != ''):
            all_hours.append(day_str + ': ' + hours_str)
    
    return ', '.join(all_hours)

def load_test_centers(state_str):
    if(not state_str in STATE_LIST):
        print('Must use a valid state string from STATE_LIST')
        raise

    outfile_path = '../tmp_data/scrapes/' + state_str + '-scrape.csv'

    if(os.path.exists(outfile_path)):
        print('Skipping state: ', state_str, ' because the outfile already exists.')
        return None
        
    test_center_rows = []
    browser = init()
    load_browser_page(browser, state_str)

    with open(outfile_path, 'w') as csv_out_file:
        out_writer = csv.writer(csv_out_file, delimiter=',', quoting=csv.QUOTE_MINIMAL)
        out_writer.writerow(OUT_CSV_HEADER)
            
        result_divs=browser.find_elements_by_class_name('result_box')
        for result_div in result_divs:
            name = extract_name(result_div)
            description = extract_description(result_div)
            address, phone = extract_addr_phone(result_div)
            url = extract_url(result_div)
            app_req, screen_req, physician_order_req = get_flags(result_div)
            drive_thru = extract_drive_thru(result_div)
            verified_by_phone = extract_verification_info(result_div)
            hours_str = get_hours(result_div)

            row_arr = [name, address, phone, url, description, hours_str, drive_thru, app_req, screen_req, physician_order_req, verified_by_phone]
            test_center_rows.append(row_arr)
            print(','.join(row_arr))
            
            out_writer.writerow(row_arr)

def load_all_test_centers():
    for state in STATE_LIST:
        print('scraping state: ', state)
        load_test_centers(state)
    
    browser.quit()

# Expand to CLI tool w/ variable inputs (ALL can be an option)
load_all_test_centers()