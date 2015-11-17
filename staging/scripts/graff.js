/**
 * Created by thoma_000 on 15.11.2015.
 */
requirejs.config({
  baseUrl: 'scripts',
  paths: {
    'text': 'imports/text',
    'jquery': 'imports/jquery-1.11.3.min',
    'mix-it-up': 'imports/jquery.mixitup',
    'mustache': 'imports/mustache',
    'google-maps': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDtNRjBxS2k_MywbRKdrgM8edIx8DSeapA&libraries=places',
    'app': '../common'
  },
  'shim': {
    'mix-it-up': ['jquery']
  }
});

requirejs(['common/main']);


