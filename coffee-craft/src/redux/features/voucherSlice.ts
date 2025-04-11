import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Voucher } from "@/types/types";

interface VoucherState {
  selectedVoucher: Voucher | null;
}

const initialState: VoucherState = {
  selectedVoucher: null,
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    applyVoucher(state, action: PayloadAction<Voucher>) {
      state.selectedVoucher = action.payload;
    },
    clearVoucher(state) {
      state.selectedVoucher = null;
    },
  },
});

export const { applyVoucher, clearVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
