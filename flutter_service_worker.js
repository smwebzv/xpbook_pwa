'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"focus_helper.js": "f51d87d818a0f0acb49b05e77b42d977",
"version.json": "ec16a443585e9f667f409f64605d0c6d",
"index.html": "a51ef67df8034dedd7a564d8d3ea658b",
"/": "a51ef67df8034dedd7a564d8d3ea658b",
"main.dart.js": "110b68dbb0ae4719c5a2c46b35c33309",
"flutter.js": "c71a09214cb6f5f8996a531350400a9a",
"favicon.png": "68cb4ed434ba1a72e39516427fcfff3e",
"well-known/apple-developer-merchantid-domain-association": "29afa7e1d291721bc64c6c9fe93223b3",
"well-known/apple-developer-merchantid-domain-association.txt": "c61591af0b20d915a49bb17220887e73",
"icons/Icon-192.png": "ff333fd1351f298b678688d494d5089a",
"icons/Icon-512.png": "643390690be4eac8fe4fb60d323eb38f",
"manifest.json": "2ee2a8957f5e79be48130013e1a089c5",
"assets/TitilliumWeb-Black.ttf": "c0b00efd57b7151220323ed08e1ce9c7",
"assets/TitilliumWeb-Bold.ttf": "08d37409a924ae95fff8df77747b0c42",
"assets/TitilliumWeb-Regular.ttf": "ed1d014bf2b8b72f27d6af65c69f710a",
"assets/AssetManifest.json": "6b3f6b45b8db003772118fd98fcbd69a",
"assets/TitilliumWeb-SemiBold.ttf": "ce96d75e97d58b7396e1431557bb02a0",
"assets/TitilliumWeb-ExtraLight.ttf": "f291df8df03282f2c26a9d93e748540e",
"assets/TitilliumWeb-BoldItalic.ttf": "10f943f4f5730e86fe90d97f38722b09",
"assets/NOTICES": "2a13e9059d01d903b25f30aaae4ab161",
"assets/TitilliumWeb-ExtraLightItalic.ttf": "bb8d387a701a2077cc64567171f47568",
"assets/FontManifest.json": "0c436fe6388abab187a49ba5f09d9d03",
"assets/AssetManifest.bin.json": "bcfcc05e63a38503427304afa293cdbb",
"assets/TitilliumWeb-SemiBoldItalic.ttf": "f8f4f55051964d2fc8edafd23d5df0b4",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_image_compress_web/assets/pica.min.js": "6208ed6419908c4b04382adc8a3053a2",
"assets/TitilliumWeb-LightItalic.ttf": "d2749e8323f7f771b6917c051384f131",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "1d9140a82c55c321f6d6c667e2e6d183",
"assets/TitilliumWeb-Italic.ttf": "a30e681e8e4821c53075768636078f4c",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/images/add_image.png": "90ec302ed42d79cd9752d739f9bd8dc6",
"assets/assets/images/login.png": "c3a0d47049bdd3505c6a3f1f6bf081b9",
"assets/assets/images/images.jpeg": "ecc3671c2848e86381b8be1312618007",
"assets/assets/images/funt_sterling.png": "71daea0de1c4e2cb849ffd3ebcc59f38",
"assets/assets/images/logo.png": "38020702740ebb03b45e487937333666",
"assets/assets/fonts/TitilliumWeb-Black.ttf": "c0b00efd57b7151220323ed08e1ce9c7",
"assets/assets/fonts/TitilliumWeb-Bold.ttf": "08d37409a924ae95fff8df77747b0c42",
"assets/assets/fonts/TitilliumWeb-Regular.ttf": "ed1d014bf2b8b72f27d6af65c69f710a",
"assets/assets/fonts/config.json": "5861e6072edcaa47883583c2f2fe085a",
"assets/assets/fonts/TitilliumWeb-SemiBold.ttf": "ce96d75e97d58b7396e1431557bb02a0",
"assets/assets/fonts/TitilliumWeb-ExtraLight.ttf": "f291df8df03282f2c26a9d93e748540e",
"assets/assets/fonts/TitilliumWeb-BoldItalic.ttf": "10f943f4f5730e86fe90d97f38722b09",
"assets/assets/fonts/TitilliumWeb-ExtraLightItalic.ttf": "bb8d387a701a2077cc64567171f47568",
"assets/assets/fonts/XpressobooksIcons.ttf": "081c437470015ad26e5351301f755c46",
"assets/assets/fonts/OFL.txt": "624efcc17a6f7350735d2d13054f7764",
"assets/assets/fonts/TitilliumWeb-SemiBoldItalic.ttf": "f8f4f55051964d2fc8edafd23d5df0b4",
"assets/assets/fonts/TitilliumWeb-LightItalic.ttf": "d2749e8323f7f771b6917c051384f131",
"assets/assets/fonts/TitilliumWeb-Italic.ttf": "a30e681e8e4821c53075768636078f4c",
"assets/assets/fonts/TitilliumWeb-Light.ttf": "edc21ba4e5eb0d77c371a8f0851ed72f",
"assets/TitilliumWeb-Light.ttf": "edc21ba4e5eb0d77c371a8f0851ed72f",
"apple_pay.js": "6f01be9389a81dd7d58da514553b6b73",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "741d50ffba71f89345996b0aa8426af8",
"canvaskit/canvaskit.js.symbols": "38cba9233b92472a36ff011dc21c2c9f",
"canvaskit/skwasm.wasm": "e42815763c5d05bba43f9d0337fa7d84",
"canvaskit/chromium/canvaskit.js.symbols": "4525682ef039faeb11f24f37436dca06",
"canvaskit/chromium/canvaskit.js": "43787ac5098c648979c27c13c6f804c3",
"canvaskit/chromium/canvaskit.wasm": "f5934e694f12929ed56a671617acd254",
"canvaskit/canvaskit.js": "c86fbd9e7b17accae76e5ad116583dc4",
"canvaskit/canvaskit.wasm": "3d2a2d663e8c5111ac61a46367f751ac",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
