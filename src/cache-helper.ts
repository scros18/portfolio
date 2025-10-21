/**
 * LocalStorage Cache Helper
 * Provides additional caching layer for non-critical data
 */

class CacheHelper {
  private static readonly CACHE_PREFIX = 'sc_portfolio_';
  private static readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  /**
   * Set cache item with expiration
   */
  static set(key: string, value: any): void {
    try {
      const item = {
        value: value,
        timestamp: Date.now(),
        expires: Date.now() + this.CACHE_DURATION
      };
      localStorage.setItem(this.CACHE_PREFIX + key, JSON.stringify(item));
    } catch (error) {
      // LocalStorage might be full or disabled, fail silently
    }
  }

  /**
   * Get cache item if not expired
   */
  static get(key: string): any {
    try {
      const itemStr = localStorage.getItem(this.CACHE_PREFIX + key);
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      
      // Check if expired
      if (Date.now() > item.expires) {
        this.remove(key);
        return null;
      }

      return item.value;
    } catch (error) {
      return null;
    }
  }

  /**
   * Remove cache item
   */
  static remove(key: string): void {
    try {
      localStorage.removeItem(this.CACHE_PREFIX + key);
    } catch (error) {
      // Fail silently
    }
  }

  /**
   * Clear all portfolio cache
   */
  static clearAll(): void {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      // Fail silently
    }
  }

  /**
   * Get cache size in bytes
   */
  static getSize(): number {
    try {
      let size = 0;
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(this.CACHE_PREFIX)) {
          size += (localStorage.getItem(key) || '').length * 2; // UTF-16
        }
      });
      return size;
    } catch (error) {
      return 0;
    }
  }
}

export default CacheHelper;
