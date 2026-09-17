const { test, expect } = require('@playwright/test')

const backendUrl = 'http://localhost:3003'

const testUser = {
  username: 'testuser',
  name: 'Test User',
  password: 'password123'
}

const secondUser = {
  username: 'seconduser',
  name: 'Second User',
  password: 'password123'
}

test.beforeEach(async ({ request }) => {
  const resetResponse = await request.post(
    `${backendUrl}/api/testing/reset`
  )

  expect(resetResponse.status()).toBe(204)

  await request.post(`${backendUrl}/api/users`, {
    data: JSON.stringify(testUser),
    headers: { 'Content-Type': 'application/json' }
  })
})

test('5.17 blog list is visible', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'blogs' })
  ).toBeVisible()
})

test('5.18 login succeeds with correct credentials', async ({
  page
}) => {
  await page.goto('/')

  await page.getByRole('link', {
    name: 'Login'
  }).click()

  await page.getByLabel('username').fill(
    testUser.username
  )

  await page.getByLabel('password').fill(
    testUser.password
  )

  await page.getByRole('button', {
    name: 'Login'
  }).click()

  await expect(
    page.getByRole('banner').getByText('Test User logged in')
  ).toBeVisible()

  await expect(
    page.getByRole('button', {
      name: 'Logout'
    })
  ).toBeVisible()
})

test('5.18 login fails with wrong credentials', async ({
  page
}) => {
  await page.goto('/')

  await page.getByRole('link', {
    name: 'Login'
  }).click()

  await page.getByLabel('username').fill(
    testUser.username
  )

  await page.getByLabel('password').fill(
    'wrongpassword'
  )

  await page.getByRole('button', {
    name: 'Login'
  }).click()

  await expect(
    page.getByText('wrong username or password')
  ).toBeVisible()
})

test('5.19 logged in user can create a blog', async ({
  page
}) => {
  await page.goto('/')

  await page.getByRole('link', {
    name: 'Login'
  }).click()

  await page.getByLabel('username').fill(
    testUser.username
  )

  await page.getByLabel('password').fill(
    testUser.password
  )

  await page.getByRole('button', {
    name: 'Login'
  }).click()

  await page.getByRole('link', {
    name: 'Create new'
  }).click()

  await page.getByRole('button', { name: 'create new blog' }).click()

  await page.getByLabel('title:').fill(
    'Routing Create Blog'
  )

  await page.getByLabel('author:').fill(
    'Test Author'
  )

  await page.getByLabel('url:').fill(
    'https://example.com'
  )

  await page.getByRole('button', {
    name: 'Create'
  }).click()

  await expect(
    page.getByRole('heading', { name: 'Routing Create Blog' }).first()
  ).toBeVisible()
})

test('5.20 blog can be liked', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', {
    name: 'Login'
  }).click()

  await page.getByLabel('username').fill(
    testUser.username
  )

  await page.getByLabel('password').fill(
    testUser.password
  )

  await page.getByRole('button', {
    name: 'Login'
  }).click()

  await page.getByRole('link', {
    name: 'Create new'
  }).click()

  await page.getByRole('button', { name: 'create new blog' }).click()

  await page.getByLabel('title:').fill(
    'Like Routing Blog'
  )

  await page.getByLabel('author:').fill(
    'Test Author'
  )

  await page.getByLabel('url:').fill(
    'https://example.com'
  )

  await page.getByRole('button', {
    name: 'Create'
  }).click()

  await page
    .getByRole('heading', { name: 'Like Routing Blog' })
    .locator('..')
    .locator('..')
    .getByRole('link', { name: 'View' })
    .click()

  await expect(
    page.getByText('0')
  ).toBeVisible()

  await page.getByRole('button', {
    name: 'Like'
  }).click()

  await expect(
    page.getByText('1')
  ).toBeVisible()
})

test('5.21 creator can delete own blog', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', {
    name: 'Login'
  }).click()

  await page.getByLabel('username').fill(
    testUser.username
  )

  await page.getByLabel('password').fill(
    testUser.password
  )

  await page.getByRole('button', {
    name: 'Login'
  }).click()

  await page.getByRole('link', {
    name: 'Create new'
  }).click()

  await page.getByRole('button', { name: 'create new blog' }).click()

  await page.getByLabel('title:').fill(
    'Delete Routing Blog'
  )

  await page.getByLabel('author:').fill(
    'Test Author'
  )

  await page.getByLabel('url:').fill(
    'https://example.com'
  )

  await page.getByRole('button', {
    name: 'Create'
  }).click()

  await page
    .getByRole('heading', { name: 'Delete Routing Blog' })
    .locator('..')
    .locator('..')
    .getByRole('link', { name: 'View' })
    .click()

  page.on('dialog', async dialog => {
    await dialog.accept()
  })

  await page.getByRole('button', {
    name: 'Delete'
  }).click()

  await expect(
    page.getByRole('heading', { name: 'Delete Routing Blog' })
  ).not.toBeVisible()
})

test('5.22 only creator sees remove button', async ({
  page,
  request
}) => {
  await request.post(`${backendUrl}/api/users`, {
    data: secondUser
  })

  await page.goto('/')

  await page.getByRole('link', {
    name: 'Login'
  }).click()

  await page.getByLabel('username').fill(
    testUser.username
  )

  await page.getByLabel('password').fill(
    testUser.password
  )

  await page.getByRole('button', {
    name: 'Login'
  }).click()

  await page.getByRole('link', {
    name: 'Create new'
  }).click()

  await page.getByRole('button', { name: 'create new blog' }).click()

  await page.getByLabel('title:').fill(
    'Ownership Routing Blog'
  )

  await page.getByLabel('author:').fill(
    'Test Author'
  )

  await page.getByLabel('url:').fill(
    'https://example.com'
  )

  await page.getByRole('button', {
    name: 'Create'
  }).click()

  await page.getByRole('button', {
    name: 'Logout'
  }).click()

  await page.getByRole('link', {
    name: 'Login'
  }).click()

  await page.getByLabel('username').fill(
    secondUser.username
  )

  await page.getByLabel('password').fill(
    secondUser.password
  )

  await page.getByRole('button', {
    name: 'Login'
  }).click()

  await page
    .getByRole('heading', { name: 'Ownership Routing Blog' })
    .locator('..')
    .locator('..')
    .getByRole('link', { name: 'View' })
    .click()

  await expect(
    page.getByRole('button', {
      name: 'Delete'
    })
  ).not.toBeVisible()
})