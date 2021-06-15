// import all pages 
import HomePage from '../pages/home.f7.html';
import routes_list from '../pages/routes_list.f7.html';
import Settings from '../pages/settings.f7.html';

import AboutPage from '../pages/about.f7.html';
import HelpPage from '../pages/help.f7.html';
import ImpressumPage from '../pages/impressum.f7.html';
// import left_panel_nav from '../pages/left_panel_nav.f7.html';


import NotFoundPage from '../pages/404.f7.html';

// build routes for router
var routes = [
    // Index page
    {
      path: '/',
      //url: './index.html',
      component: HomePage,
      name: 'home',
      keepAlive: false, //first I tried with 'true' but it is better for Openlayers map to not have several maps simultaneous
      //master: true,
      //reloadAll: true,
      // on: {
      //   //pageInit: init(), // init + loadMap functions
      //   //pageAfterIn: init(),
        
      // }
    },
    {
      name: 'about',
      path: '/about/',
      //url: './pages/about.html',
      component: AboutPage,
      options: {
        animate: true,
        transition: 'f7-parallax',
        pushState: true,
      },
    },

    // {
    //   name: 'left-panel',
    //   path: '/left-panel/',
    //   panel: {
    //     component: left_panel_nav,
    //     swipe: true,
    //     // side: left,
    //   //  url: './pages/left_panel_nav.html',
      
    //   },
    //   // component: left_panel_nav,
    // },

    {
      name: 'routes_list',
      path: '/routes_list/',
      //url: './pages/ways.html',
      component: routes_list,
      options: {
        // animate: true,
        // transition: 'f7-parallax',
      },
    },

    {
      name: 'help',
      path: '/help/',

      component: HelpPage,
      options: {
        // animate: true,
        // transition: 'f7-parallax',
      },
    },

    {
      name: 'impressum',
      path: '/impressum/',

      component: ImpressumPage,
      options: {
        // animate: true,
        // transition: 'f7-parallax',
      },
    },
    {
      name: 'settings',
      path: '/settings/',
      //url: './pages/settings.html',
      component: Settings,
      options: {
        // animate: true,
        // transition: 'f7-parallax',
      },
      on: {
        pageAfterIn: function test (e, page) {
          // do something after page gets into the view
        },
        pageInit: function (e, page) {
          // do something when page initialized
        },
      }
    },

    // Default route, match to all pages (e.g. 404 page) MUST BE THE LAST
    {
      path: '(.*)',
      //url: './pages/404.html',
      component: NotFoundPage,
    },
  ];

export default routes;