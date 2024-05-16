import { Route } from "pig-fwk";
import { Header } from "./components/Header.component";
import { SystemCards } from "./components/SystemCards.component";

export const routes: Route[] = [
  {
    path: "",
    slots: {
      header: Header,
       content: SystemCards
    },
    // children: [
    //   {
    //     path: "about",
    //     slots: {
    //       content: About,
    //     },
    //   },
    //   {
    //     path: "contact",
    //     slots: {
    //       content: Contact,
    //     },
    //   },
    //   ...equityRoutes,
    // ],
  },
];
