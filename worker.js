export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // إذا كان الطلب لرابط الصفحة الرئيسية أو أي ملف آخر
    try {
      // يحاول تقديم الملف الثابت أولاً (مثل ashraf.jpg أو P1.jpg أو index.html)
      const asset = await env.ASSETS.fetch(request);
      if (asset.status !== 404) {
        return asset;
      }
    } catch (e) {
      // في حال عدم وجود الربط
    }

    // إذا لم يجد الملف أو كان الرابط رئيسي يرجع index.html
    return env.ASSETS.fetch(new URL('/index.html', request.url));
  }
};
