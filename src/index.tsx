import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { store } from 'store/configureStore'
import { ThemeProvider } from 'styles/theme/ThemeProvider'

import { App } from './app'
import reportWebVitals from './reportWebVitals'

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)

root.render(
    <Provider store={store}>
        <ThemeProvider>
            <HelmetProvider>
                {/* <React.StrictMode> */}
                <App />
                {/* </React.StrictMode> */}
            </HelmetProvider>
        </ThemeProvider>
    </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
