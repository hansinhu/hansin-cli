module.exports.getManifestJSON = function (publicPath) {
  return {
    'name': 'Club Factory Lite',
    'short_name': 'Club Factory Lite',
    'description': null,
    'dir': 'auto',
    'lang': 'en-US',
    'display': 'standalone',
    'orientation': 'portrait',
    'start_url': 'https://m.clubfactory.com/?utm_source=homescreen',
    'background_color': '#fff',
    'theme_color': '#FFFFFF',
    'icons': [
      {
        'src': publicPath + 'manifest/icons/android-chrome-36x36.png',
        'sizes': '36x36',
        'type': 'image/png',
      },
      {
        'src': publicPath + 'manifest/icons/android-chrome-48x48.png',
        'sizes': '48x48',
        'type': 'image/png',
      },
      {
        'src': publicPath + 'manifest/icons/android-chrome-72x72.png',
        'sizes': '72x72',
        'type': 'image/png',
      },
      {
        'src': publicPath + 'manifest/icons/android-chrome-96x96.png',
        'sizes': '96x96',
        'type': 'image/png',
      },
      {
        'src': publicPath + 'manifest/icons/android-chrome-144x144.png',
        'sizes': '144x144',
        'type': 'image/png',
      },
      {
        'src': publicPath + 'manifest/icons/android-chrome-192x192.png',
        'sizes': '192x192',
        'type': 'image/png',
      },
      {
        'src': publicPath + 'manifest/icons/android-chrome-256x256.png',
        'sizes': '256x256',
        'type': 'image/png',
      },
      {
        'src': publicPath + 'manifest/icons/android-chrome-384x384.png',
        'sizes': '384x384',
        'type': 'image/png',
      },
      {
        'src': publicPath + 'manifest/icons/android-chrome-512x512.png',
        'sizes': '512x512',
        'type': 'image/png',
      },
    ],
  }
}