import { RouterProvider } from 'react-router-dom'
import { CircularProgress, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { routers } from './routes/routers'
import { theme } from './themes/themes'
import { store } from './redux/store'

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider
          router={routers}
          fallbackElement={<CircularProgress />} />
      </ThemeProvider>
    </Provider>
  )
}

export default App
