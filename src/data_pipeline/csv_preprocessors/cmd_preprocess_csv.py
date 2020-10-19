import csv
import importlib
import click
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import reference_constants
import csv_helpers
import maine_preprocessor
import idaho_preprocessor

TARGET_PREPROCESSED_CSV_HEADER = reference_constants.TARGET_PREPROCESSED_CSV_HEADER

OUT_FILE_PATH = '../tmp_data/pp_out_lts.csv'

def load_preprocessor(source):
    options = {
        'maine': maine_preprocessor.preprocess_csv,
        'idaho': idaho_preprocessor.preprocess_csv
    }

    if source in options:
        return options[source]
    else:
        raise Exception('Specified source is not configured. Check "options" dict for available sources.')

def main_tool_process(csv_file, source):
    preprocessor = load_preprocessor(source)

    with open(csv_file) as test_centers_file:
        test_center_reader = csv.reader(test_centers_file)
        header = next(test_center_reader)

        with open(OUT_FILE_PATH, 'w') as out_file:
            out_writer = csv.writer(out_file, delimiter=',', quoting=csv.QUOTE_MINIMAL)
            out_writer.writerow(TARGET_PREPROCESSED_CSV_HEADER)

            for test_center in test_center_reader:
                test_center_dict = csv_helpers.convert_csv_row_to_dict(test_center, header)
                arranged_test_center_row = preprocessor(test_center_dict)
                out_writer.writerow(arranged_test_center_row)
    
    print('Success! formatted output file is at: ', OUT_FILE_PATH)
            

# Command line interface
@click.command()
@click.option('--csv_file', default=None, help='CSV file containing test center rows, sourced from an external organization')
@click.option('--source', default=None, help='Source organization (format to use). Currently one option: maine')
def exec_tool(csv_file, source):
    main_tool_process(csv_file, source)

if __name__ == '__main__':
    exec_tool()