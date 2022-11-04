import { createSlice } from "@reduxjs/toolkit";
export const uiSlice = createSlice({
	name: "ui",
	initialState: {
		toggleMainMenu: false,
		toggleUserMenu: false,
		showUpdateProductModal: false,
		showDeleteModal: false,
		showInsertModal: false,
		showSaleModal: false,
		showEntryModal: false,
		toggleSideBar: false,
	},
	reducers: {
		setToggleMainMenu: (state /*action*/) => {
			state.toggleMainMenu = !state.toggleMainMenu;
		},
		setToggleUserMenu: (state) => {
			state.toggleUserMenu = !state.toggleUserMenu;
		},
		setShowUpdateProductModal: (state) => {
			state.showUpdateProductModal = !state.showUpdateProductModal;
		},
		setShowDeleteModal: (state) => {
			state.showDeleteModal = !state.showDeleteModal;
		},
		setShowInsertModal: (state) => {
			state.showInsertModal = !state.showInsertModal;
		},
		setShowSaleModal: (state) => {
			state.showSaleModal = !state.showSaleModal;
		},
		setShowEntryModal: (state) => {
			state.showEntryModal = !state.showEntryModal;
		},
		setToggleSideBar: (state) => {
			console.log("toogle");
			state.toggleSideBar = !state.toggleSideBar;
		},
	},
});

export const {
	setToggleSideBar,
	setToggleMainMenu,
	setToggleUserMenu,
	setShowUpdateProductModal,
	setShowDeleteModal,
	setShowInsertModal,
	setShowSaleModal,
	setShowEntryModal,
} = uiSlice.actions;
