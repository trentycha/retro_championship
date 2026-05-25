import { test, expect } from '@playwright/test';

test('inscription d\'un nouvel utilisateur', async ({ page }) => {

    const email = `playwright_${Date.now()}@test.com`;
    const username = `playwright_${Date.now()}`;

    await page.goto('/register');

    await page.fill('input[placeholder="Votre email"]', email);
    await page.fill('input[placeholder="Votre mot de passe"]', 'password123');
    await page.fill('input[placeholder="Votre pseudo"]', username);
    await page.fill('input[type="date"]', '1997-06-19');
    await page.fill('input[placeholder="Votre ville"]', 'Bordeaux');
    await page.selectOption('select', 'player');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/', { timeout: 10000 });

});

test('inscription avec un mail déjà existant', async ({ page }) => {

    await page.goto('/register');

    await page.fill('input[placeholder="Votre email"]', 'player1@retro.com');
    await page.fill('input[placeholder="Votre mot de passe"]', 'password123');
    await page.fill('input[placeholder="Votre pseudo"]', 'uniqueusername123');
    await page.fill('input[type="date"]', '1997-06-19');
    await page.fill('input[placeholder="Votre ville"]', 'Bordeaux');
    await page.selectOption('select', 'player');

    await page.click('button[type="submit"]');

    await expect(page.locator('p.text-red-500')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('p.text-red-500')).toContainText('Un autre compte possède déjà ce mail');

});

