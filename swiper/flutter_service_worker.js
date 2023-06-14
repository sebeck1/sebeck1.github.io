'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.json": "2695ce53cf81fd98da78917ba0ba062f",
"assets/AssetManifest.smcbin": "658f6cd3aaf3414e8cb976325ad3cb45",
"assets/assets/images/akbaba.jpg": "3fede4b4e83a92318872f5b0e5221450",
"assets/assets/images/background.png": "004467eb21ceae0b132cb9360a9d2b78",
"assets/assets/images/bolz.jpg": "b0a60c13ce803deb2027d629ebccd09c",
"assets/assets/images/brenig.jpg": "cbf74db602b81f5f9b448e9faa81f2f8",
"assets/assets/images/check.png": "45d4cdb22d06476e8611816928485f97",
"assets/assets/images/clemens.jpg": "6cf4820e9c815947f92fa9d86112db96",
"assets/assets/images/hein.jpg": "013fe5796ad23edf9c16caceeec7b3b9",
"assets/assets/images/heupel.jpg": "bfef1bd0176bafe9ccd04fd5ebf00f71",
"assets/assets/images/loest.jpg": "f6fb1313876a3cbacb7933ccff823627",
"assets/assets/images/lueking.jpg": "83d3f1f725cd03a7953e125a1fbe1c5b",
"assets/assets/images/name_box.png": "7b5d295666a667a9458e75f45b0b3b1a",
"assets/assets/images/nowak.jpg": "5e6c0d500ec55c388f2f080ead26b5c5",
"assets/assets/images/pic_box.png": "8f4ebbd664fbc4b93ae3d9b6cf52de3a",
"assets/assets/images/soppa.jpg": "b1689b92c30866a69b0f4d7659be6901",
"assets/assets/images/spilker.jpg": "840d9ddea0b7ccad32d81e8b739d1ae3",
"assets/assets/images/stars.png": "ff208c0d7ec1dc95ea4233d58d64b7b6",
"assets/assets/images/star_full.png": "2d0f8705a0421eacebb4fd44e858123f",
"assets/assets/images/star_unfull.png": "afdb62d4d40c6d2144a99e89a34344b8",
"assets/assets/images/vens.jpg": "ea8076aa01f53ece159548b77a7af39f",
"assets/assets/images/vieten.jpg": "9c091aeee605ac738f278592eb4b9164",
"assets/assets/images/voss.jpg": "03decdb08ddf04faee143717ff1b12f7",
"assets/assets/images/wegerhoff.jpg": "c59ff05e156104a922194cf8146bff2c",
"assets/assets/images/wrong.png": "f146709643f0ed0c08c0daef1ae70348",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "ec83d0faf1f3edd257788b3f76efe980",
"assets/NOTICES": "6fce19af8833d927ed810d0400893916",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "59ed8478b398a8966eee147930f3d966",
"canvaskit/canvaskit.wasm": "addb546d7eb19639ede5238fa57b5866",
"canvaskit/chromium/canvaskit.js": "853c6cebea386c05aa9d954f11b2c1ca",
"canvaskit/chromium/canvaskit.wasm": "834110c2679de0111acc097ea8d8c5c4",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "bc7920d94db826e82c862f2f365c41cf",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "45e5a54672b771563a5e9b7ab15dae2d",
"/": "45e5a54672b771563a5e9b7ab15dae2d",
"main.dart.js": "90eff02b6d656374489e803a98e32d3e",
"manifest.json": "404b19c46bf05c3cfa9235449e4d4857",
"version.json": "ce7d20b11952de74070a3801f990607c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
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
