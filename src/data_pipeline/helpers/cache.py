# This lightweight cache utility can be used to store computations or external resources

import json
from os import path, pardir
from hashlib import blake2b
THIS_DIR = path.dirname(path.abspath(__file__))

class Cache:

    def __init__(self):
        self.CACHE_PATH = path.join(THIS_DIR, pardir, 'app_cache/cache.json')
        self.__cache = {}
    
    def load_cache_file(self):
        if path.exists(self.CACHE_PATH):
            with open(self.CACHE_PATH) as cache_file:
                cache_json_obj = json.load(cache_file)
                self.__cache = cache_json_obj
        else: 
            new_cache = {}
            self.__cache = new_cache

    def write_cache_file(self):
        with open(self.CACHE_PATH, 'w') as cache_file:
            json.dump(self.__cache, cache_file)

    def add_item_to_cache(self, *ignore, bucket, key, value, is_hex_key=False):
        if not bucket in self.__cache:
            self.__cache[bucket] = {}
        
        cache_key = key
        if not is_hex_key:
            cache_key = self.__generate_key_hash(key=key)

        self.__cache[bucket][cache_key] = value

    def lookup_item_in_cache(self, *ignore, bucket, key, is_hex_key=False):
        cache_key = key
        if not is_hex_key:
            cache_key = self.__generate_key_hash(key=key)

        if bucket in self.__cache and cache_key in self.__cache[bucket]:
            return self.__cache[bucket][cache_key]

        return None
    
    def __generate_key_hash(self, *ignore, key):
        hash_key = blake2b(digest_size=48)

        hash_key.update(bytes(key, encoding='utf-8'))
        hex_key = hash_key.hexdigest()

        return hex_key