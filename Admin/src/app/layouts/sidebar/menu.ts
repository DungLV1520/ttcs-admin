import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 8,
    label: "MENUITEMS.APPS.TEXT",
    isTitle: true,
  },

  {
    id: 12,
    label: "MENUITEMS.ECOMMERCE.TEXT",
    icon: "bx-store",
    link: "/ecommerce/customers",
  },
  {
    id: 12,
    label: "Trip",
    icon: "bx bxl-telegram",
    link: "/trip/customers-trip",
  },
  {
    id: 48,
    label: "MENUITEMS.CONTACTS.TEXT",
    icon: "bxs-user-detail",
    link: "/user/list",
  },
  {
    id: 48,
    label: "Ticket",
    icon: "bx bx-right-indent",
    link: "/ticket/list",
  },
  {
    id: 48,
    label: "Company",
    icon: "bx bx-crown",
    link: "/company/list",
  },
  {
    id: 48,
    label: "Vehicle",
    icon: "bx bx-bus",
    link: "/vehicle/advanced",
  },
  {
    id: 21,
    label: "MENUITEMS.CRYPTO.TEXT",
    icon: "bx-bitcoin",
    link: "/crypto/orders",
  },
  {
    id: 56,
    label: "MENUITEMS.PAGES.TEXT",
    isTitle: true,
  },
  {
    id: 57,
    label: "MENUITEMS.AUTHENTICATION.TEXT",
    icon: "bx-user-circle",
    badge: {
      variant: "success",
      text: "MENUITEMS.AUTHENTICATION.BADGE",
    },
    subItems: [
      {
        id: 64,
        label: "MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN",
        link: "/pages/lock-screen-1",
        parentId: 57,
      },

      {
        id: 66,
        label: "MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL",
        link: "/pages/confirm-mail",
        parentId: 57,
      },

    ],
  },
  {
    id: 72,
    label: "MENUITEMS.UTILITY.TEXT",
    icon: "bx-file",
    link: "/pages/timeline",
  },
  {
    id: 80,
    label: "MENUITEMS.COMPONENTS.TEXT",
    isTitle: true,
  },
  {
    id: 81,
    label: "MENUITEMS.UIELEMENTS.TEXT",
    icon: "bx-tone",
    subItems: [
      {
        id: 82,
        label: "MENUITEMS.UIELEMENTS.LIST.ALERTS",
        link: "/ui/alerts",
        parentId: 81,
      },
      {
        id: 83,
        label: "MENUITEMS.UIELEMENTS.LIST.BUTTONS",
        link: "/ui/buttons",
        parentId: 81,
      },
      {
        id: 84,
        label: "MENUITEMS.UIELEMENTS.LIST.CARDS",
        link: "/ui/cards",
        parentId: 81,
      },
      {
        id: 85,
        label: "MENUITEMS.UIELEMENTS.LIST.CAROUSEL",
        link: "/ui/carousel",
        parentId: 81,
      },
      {
        id: 86,
        label: "MENUITEMS.UIELEMENTS.LIST.DROPDOWNS",
        link: "/ui/dropdowns",
        parentId: 81,
      },
      {
        id: 87,
        label: "MENUITEMS.UIELEMENTS.LIST.GRID",
        link: "/ui/grid",
        parentId: 81,
      },
      {
        id: 88,
        label: "MENUITEMS.UIELEMENTS.LIST.IMAGES",
        link: "/ui/images",
        parentId: 81,
      },
      {
        id: 88,
        label: "MENUITEMS.UIELEMENTS.LIST.LIGHTBOX",
        link: "/ui/lightbox",
        parentId: 81,
      },
      {
        id: 89,
        label: "MENUITEMS.UIELEMENTS.LIST.MODALS",
        link: "/ui/modals",
        parentId: 81,
      },
      {
        id: 90,
        label: "MENUITEMS.UIELEMENTS.LIST.RANGESLIDER",
        link: "/ui/rangeslider",
        parentId: 81,
      },
      {
        id: 91,
        label: "MENUITEMS.UIELEMENTS.LIST.PROGRESSBAR",
        link: "/ui/progressbar",
        parentId: 81,
      },
      {
        id: 92,
        label: "MENUITEMS.UIELEMENTS.LIST.PLACEHOLDER",
        link: "/ui/placeholder",
        parentId: 81,
      },
      {
        id: 93,
        label: "MENUITEMS.UIELEMENTS.LIST.SWEETALERT",
        link: "/ui/sweet-alert",
        parentId: 81,
      },
      {
        id: 94,
        label: "MENUITEMS.UIELEMENTS.LIST.TABS",
        link: "/ui/tabs-accordions",
        parentId: 81,
      },
      {
        id: 95,
        label: "MENUITEMS.UIELEMENTS.LIST.TYPOGRAPHY",
        link: "/ui/typography",
        parentId: 81,
      },
      {
        id: 96,
        label: "MENUITEMS.UIELEMENTS.LIST.VIDEO",
        link: "/ui/video",
        parentId: 81,
      },
      {
        id: 97,
        label: "MENUITEMS.UIELEMENTS.LIST.GENERAL",
        link: "/ui/general",
        parentId: 81,
      },
      {
        id: 98,
        label: "MENUITEMS.UIELEMENTS.LIST.COLORS",
        link: "/ui/colors",
        parentId: 81,
      },
      {
        id: 99,
        label: "MENUITEMS.UIELEMENTS.LIST.CROPPER",
        link: "/ui/image-crop",
        parentId: 81,
      },
    ],
  },
  {
    id: 100,
    label: "MENUITEMS.FORMS.TEXT",
    icon: "bxs-eraser",
    badge: {
      variant: "danger",
      text: "MENUITEMS.FORMS.BADGE",
    },
    subItems: [
      {
        id: 101,
        label: "MENUITEMS.FORMS.LIST.ELEMENTS",
        link: "/form/elements",
        parentId: 100,
      },
      {
        id: 102,
        label: "MENUITEMS.FORMS.LIST.LAYOUTS",
        link: "/form/layouts",
        parentId: 100,
      },
      {
        id: 103,
        label: "MENUITEMS.FORMS.LIST.VALIDATION",
        link: "/form/validation",
        parentId: 100,
      },
      {
        id: 104,
        label: "MENUITEMS.FORMS.LIST.ADVANCED",
        link: "/form/advanced",
        parentId: 100,
      },
      {
        id: 105,
        label: "MENUITEMS.FORMS.LIST.EDITOR",
        link: "/form/editor",
        parentId: 100,
      },
      {
        id: 106,
        label: "MENUITEMS.FORMS.LIST.FILEUPLOAD",
        link: "/form/uploads",
        parentId: 100,
      },
      {
        id: 107,
        label: "MENUITEMS.FORMS.LIST.REPEATER",
        link: "/form/repeater",
        parentId: 100,
      },
      {
        id: 108,
        label: "MENUITEMS.FORMS.LIST.WIZARD",
        link: "/form/wizard",
        parentId: 100,
      },
      {
        id: 109,
        label: "MENUITEMS.FORMS.LIST.MASK",
        link: "/form/mask",
        parentId: 100,
      },
    ],
  },
  {
    id: 110,
    icon: "bx-list-ul",
    label: "MENUITEMS.TABLES.TEXT",
    subItems: [
      {
        id: 111,
        label: "MENUITEMS.TABLES.LIST.BASIC",
        link: "/tables/basic",
        parentId: 110,
      },
      {
        id: 112,
        label: "MENUITEMS.TABLES.LIST.ADVANCED",
        link: "/tables/advanced",
        parentId: 110,
      },
    ],
  },
  {
    id: 113,
    icon: "bxs-bar-chart-alt-2",
    label: "MENUITEMS.CHARTS.TEXT",
    subItems: [
      {
        id: 114,
        label: "MENUITEMS.CHARTS.LIST.APEX",
        link: "/charts/apex",
        parentId: 113,
      },
      {
        id: 115,
        label: "MENUITEMS.CHARTS.LIST.CHARTJS",
        link: "/charts/chartjs",
        parentId: 113,
      },
      {
        id: 116,
        label: "MENUITEMS.CHARTS.LIST.CHARTIST",
        link: "/charts/chartist",
        parentId: 113,
      },
      {
        id: 117,
        label: "MENUITEMS.CHARTS.LIST.ECHART",
        link: "/charts/echart",
        parentId: 113,
      },
    ],
  },
  {
    id: 118,
    label: "MENUITEMS.ICONS.TEXT",
    icon: "bx-aperture",
    subItems: [
      {
        id: 119,
        label: "MENUITEMS.ICONS.LIST.BOXICONS",
        link: "/icons/boxicons",
        parentId: 118,
      },
      {
        id: 120,
        label: "MENUITEMS.ICONS.LIST.MATERIALDESIGN",
        link: "/icons/materialdesign",
        parentId: 118,
      },
      {
        id: 121,
        label: "MENUITEMS.ICONS.LIST.DRIPICONS",
        link: "/icons/dripicons",
        parentId: 118,
      },
      {
        id: 122,
        label: "MENUITEMS.ICONS.LIST.FONTAWESOME",
        link: "/icons/fontawesome",
        parentId: 118,
      },
    ],
  },
  {
    id: 123,
    label: "MENUITEMS.MAPS.TEXT",
    icon: "bx-map",
    subItems: [
      {
        id: 124,
        label: "MENUITEMS.MAPS.LIST.GOOGLEMAP",
        link: "/maps/google",
        parentId: 123,
      },
    ],
  },
  {
    id: 125,
    label: "MENUITEMS.MULTILEVEL.TEXT",
    icon: "bx-share-alt",
    subItems: [
      {
        id: 126,
        label: "MENUITEMS.MULTILEVEL.LIST.LEVEL1.1",
        link: "#",
        parentId: 125,
      },
      {
        id: 127,
        label: "MENUITEMS.MULTILEVEL.LIST.LEVEL1.2",
        parentId: 125,
        subItems: [
          {
            id: 128,
            label: "MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1",
            parentId: 127,
          },
          {
            id: 129,
            label: "MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2",
            parentId: 127,
          },
        ],
      },
    ],
  },
];
