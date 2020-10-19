import unittest
import os
from helpers import cache
THIS_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(THIS_DIR, os.pardir, 'data')

class TestCacheMethods(unittest.TestCase):

    def test_cache_basic_functionality(self):
        test_cache = cache.Cache()

        test_cache.add_item_to_cache(bucket='test', key='key', value='val')
        retrieved_item = test_cache.lookup_item_in_cache(bucket='test', key='key')

        self.assertEqual(retrieved_item, 'val')
    
    def test_cache_overwrite(self):
        test_cache = cache.Cache()

        test_cache.add_item_to_cache(bucket='test', key='key', value='val1')
        test_cache.add_item_to_cache(bucket='test', key='key', value='val2')
        retrieved_item = test_cache.lookup_item_in_cache(bucket='test', key='key')

        self.assertEqual(retrieved_item, 'val2')
    
    def test_cache_misses(self):
        test_cache = cache.Cache()

        # Both bucket and key don't exist
        retrieved_item = test_cache.lookup_item_in_cache(bucket='test', key='key')
        self.assertEqual(retrieved_item, None)

        # Bucket exists, but key does not exist
        test_cache.add_item_to_cache(bucket='test', key='key', value='val')
        retrieved_item = test_cache.lookup_item_in_cache(bucket='test', key='altkey')
        self.assertEqual(retrieved_item, None)
    
    def test_cache_hex_keys_basics(self):
        test_cache = cache.Cache()

        test_cache.add_item_to_cache(bucket='test', key='74FDE3', value='val', is_hex_key=True)
        retrieved_item = test_cache.lookup_item_in_cache(bucket='test', key='74FDE3', is_hex_key=True)
        
        self.assertEqual(retrieved_item, 'val')

if __name__ == '__main__':
    unittest.main()