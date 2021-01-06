import json

def write_json_outfile(out_path, obj):
    with open(out_path, 'w') as outfile:
        json.dump(obj, outfile, indent=4)