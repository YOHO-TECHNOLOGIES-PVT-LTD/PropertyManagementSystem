import { createSlice } from "@reduxjs/toolkit"

interface Property {
  id: string
  name: string
  location?: string
}

const propertySlice = createSlice({
  name: "property",
  initialState: {
    data: [] as Property[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setProperty(state, action) {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
      state.loading = false
    },
    addProperty(state, action) {
      state.data.push(action.payload)
      state.loading = false
    },
    updateProperty(state, action) {
      const index = state.data.findIndex((p: Property) => p.id === action.payload.id)
      if (index !== -1) {
        state.data[index] = action.payload
      }
      state.loading = false
    },
  },
})

export const { setProperty, setLoading, setError, addProperty, updateProperty } =
  propertySlice.actions

export default propertySlice.reducer
