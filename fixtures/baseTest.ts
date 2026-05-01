import {test as base} from "@playwright/test"
import HomePage from "../pages/homePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"
import SearchResultsPage from "../pages/SearchResultsPage"
import ComparePage from "../pages/ComparePage"
import WishlistPage from "../pages/WishlistPage"
import CartPage from "../pages/CartPage"
import MainNavigationComponent from "../pages/components/MainNavigationComponent";
import ShopByCategoryComponent from "../pages/components/ShopByCategoryComponent";
import ProductActionButtons from "../pages/components/ProductActionButtons";
import ToastComponent from "../pages/components/ToastComponent";
import HeaderActionsComponent from "../pages/components/HeaderActionsComponent";
import TopProductsComponent from "../pages/components/TopProductsComponent";
import QuickViewComponent from "../pages/components/QuickViewComponent";

type MyFixtures = {
    homePage: HomePage
    loginPage: LoginPage
    registerPage: RegisterPage
    searchResultsPage: SearchResultsPage
    comparePage: ComparePage
    wishlistPage: WishlistPage
    cartPage: CartPage
    mainNavigation: MainNavigationComponent
    shopByCategory: ShopByCategoryComponent
    productActionButtons: ProductActionButtons
    toast: ToastComponent
    headerActions: HeaderActionsComponent
    topProducts: TopProductsComponent
    quickView: QuickViewComponent
}

export const test = base.extend<MyFixtures>({

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    searchResultsPage: async ({ page }, use) => {
        const searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    mainNavigation: async ({ page }, use) => {
        const mainNavigation = new MainNavigationComponent(page);
        await use(mainNavigation);
    },

    shopByCategory: async ({ page }, use) => {
        const shopByCategory = new ShopByCategoryComponent(page);
        await use(shopByCategory);
    },

    comparePage: async ({ page }, use) => {
        const comparePage = new ComparePage(page);
        await use(comparePage);
    },

    wishlistPage: async ({ page }, use) => {
        const wishlistPage = new WishlistPage(page);
        await use(wishlistPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    productActionButtons: async ({ page }, use) => {
        const productActionButtons = new ProductActionButtons(page);
        await use(productActionButtons);
    },

    toast: async ({ page }, use) => {
        const toast = new ToastComponent(page);
        await use(toast);
    },

    headerActions: async ({ page }, use) => {
        const headerActions = new HeaderActionsComponent(page);
        await use(headerActions);
    },

    topProducts: async ({ page }, use) => {
        const topProducts = new TopProductsComponent(page);
        await use(topProducts);
    },

    quickView: async ({ page }, use) => {
        const quickView = new QuickViewComponent(page);
        await use(quickView);
    }

});

export { expect } from "@playwright/test";
