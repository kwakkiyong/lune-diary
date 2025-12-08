import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { Calendar } from '@/pages/Calendar'
import { Insights } from '@/pages/Insights'

export const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/calendar',
    element: (
      <Layout>
        <Calendar />
      </Layout>
    ),
  },
  {
    path: '/insights',
    element: (
      <Layout>
        <Insights />
      </Layout>
    ),
  },
])

