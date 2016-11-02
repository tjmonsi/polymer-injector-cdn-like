window.Polymer = window.Polymer || {
  dom: 'shadow',
  lazyRegister: true
};

// Load webcomponentsjs polyfill if browser does not support native Web Components
(function() {
  'use strict';
  
  var script = document.getElementById("menucloud-embedder")
  var a = document.createElement('a');
  a.setAttribute('href', script.getAttribute('src'));
  var secret = script.getAttribute('secret');
  var key = script.getAttribute('key');
  var url = window.location;
  var baseUrl = a.protocol + '//' + a.hostname;
  
  var onload = function() {
    // For native Imports, manually fire WebComponentsReady so user code
    // can use the same code path for native and polyfill'd imports.
    if (!window.HTMLImports) {
      document.dispatchEvent(
        new CustomEvent('WebComponentsReady', {bubbles: true})
      );
    }
    
    console.log('hello world');
    
    // insert all dependencies here
    var dep = document.createElement('link');
    dep.rel = 'import';
    dep.href = baseUrl + '/components/workspace-element.html';
    document.head.appendChild(dep);
    
    var embed = document.getElementById('menucloud-embed');
    var template = document.createElement('workspace-element');
    template.key = key;
    template.secret = secret;
    template.url = url.hostname;
    embed.appendChild(template);
  };
  
  var webComponentsSupported = (
    'registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')
  );

  
  if (!webComponentsSupported) {
    var s = document.createElement('script');
    s.async = true;
    s.src = baseUrl + '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
    s.onload = onload;
    document.head.appendChild(s);
  } else {
    onload();
  }
})();