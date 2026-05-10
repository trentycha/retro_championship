import { test, expect } from '@playwright/test';

test('affichage de la liste des tournois', async ({ page }) => {

    await page.goto('/tournaments');

    await expect(page).toHaveURL('/tournaments');
    await expect(page.getByRole('heading', { name: 'Tous les tournois' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'En cours' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'A venir' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Terminés' })).toBeVisible();

});

test('affichage de la page 404 sur une URL inexistante', async ({ page }) => {

    await page.goto('/une-page-qui-nexiste-pas');

    await expect(page).toHaveURL('/une-page-qui-nexiste-pas');
    await expect(page.locator('body')).toBeVisible();

});