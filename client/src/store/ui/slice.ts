import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../types/product.interface";

type ModalType = "add" | "edit" | null;

interface ModalState {
  isModalOpen: boolean;
  modalType: ModalType;
  currentProduct: IProduct | null;
}

const initialState: ModalState = {
  isModalOpen: false,
  modalType: null,
  currentProduct: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal(state, action) {
      state.isModalOpen = true;
      state.modalType = action.payload.modalType;
      state.currentProduct = action.payload.product || null;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalType = null;
      state.currentProduct = null;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
