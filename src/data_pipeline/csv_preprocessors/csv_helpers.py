
def convert_csv_row_to_dict(row, header):
    out_dict = {}
    for i in range(len(row)):
        out_dict[header[i]] = row[i]
    
    return out_dict
