# This library merges all CSV files in a target directory. Assumes the files have equivalent columns/structure.
# This is handy to use after running the scraper, to compile it's various output files.

import csv
import os
import re

OUT_FILE_PATH = '../tmp_data/merged_outfile.csv'

def is_csv_filename(filename):
    flag = re.search('\.csv$', filename.lower())
    if(flag != None):
        return True
    return False

(_, _, filenames) = os.walk('../tmp_data/scrapes').next()

csv_files = (filename for filename in filenames if is_csv_filename(filename))
sorted_csv_files = sorted(csv_files)
header_write_flag = False

with open(OUT_FILE_PATH, 'w') as out_file:
    out_writer = csv.writer(out_file, delimiter=',', quoting=csv.QUOTE_MINIMAL)

    for tc_file in sorted_csv_files:
        with open('../tmp_data/scrapes/' + tc_file) as test_centers_file:
            test_center_reader = csv.reader(test_centers_file)
            header = next(test_center_reader)
            
            if(header_write_flag == False):
                out_writer.writerow(header)
                header_write_flag = True

            for test_center in test_center_reader:
                out_writer.writerow(test_center)
