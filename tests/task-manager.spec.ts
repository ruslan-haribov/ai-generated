import { test, expect } from '@playwright/test';

test.describe('Task Manager', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays the page title and empty state', async ({ page }) => {
    await expect(page).toHaveTitle('Task Manager');
    await expect(page.getByTestId('task-manager')).toBeVisible();
    await expect(page.getByTestId('empty-state')).toBeVisible();
    await expect(page.getByTestId('empty-state')).toHaveText('No tasks yet. Add one above!');
    await expect(page.getByTestId('total-count')).toHaveText('0 tasks');
    await expect(page.getByTestId('active-count')).toHaveText('0 active');
  });

  test('adds a new task', async ({ page }) => {
    const input = page.getByTestId('task-input');
    await input.fill('Buy groceries');
    await page.getByTestId('add-task-btn').click();

    const taskItem = page.getByTestId('task-item');
    await expect(taskItem).toHaveCount(1);
    await expect(page.getByTestId('task-text')).toHaveText('Buy groceries');
    await expect(page.getByTestId('total-count')).toHaveText('1 task');
    await expect(page.getByTestId('active-count')).toHaveText('1 active');
    await expect(page.getByTestId('empty-state')).toBeHidden();
    await expect(input).toHaveValue('');
  });

  test('adds multiple tasks', async ({ page }) => {
    const tasks = ['First task', 'Second task', 'Third task'];

    for (const task of tasks) {
      await page.getByTestId('task-input').fill(task);
      await page.getByTestId('add-task-btn').click();
    }

    await expect(page.getByTestId('task-item')).toHaveCount(3);
    await expect(page.getByTestId('total-count')).toHaveText('3 tasks');
    await expect(page.getByTestId('active-count')).toHaveText('3 active');
  });

  test('does not add empty tasks', async ({ page }) => {
    await page.getByTestId('add-task-btn').click();
    await expect(page.getByTestId('task-item')).toHaveCount(0);
    await expect(page.getByTestId('empty-state')).toBeVisible();
  });

  test('marks a task as completed', async ({ page }) => {
    await page.getByTestId('task-input').fill('Walk the dog');
    await page.getByTestId('add-task-btn').click();

    const checkbox = page.getByTestId('task-checkbox');
    await checkbox.check();

    await expect(checkbox).toBeChecked();
    await expect(page.getByTestId('task-item')).toHaveClass(/completed/);
    await expect(page.getByTestId('active-count')).toHaveText('0 active');
  });

  test('unmarks a completed task', async ({ page }) => {
    await page.getByTestId('task-input').fill('Read a book');
    await page.getByTestId('add-task-btn').click();

    const checkbox = page.getByTestId('task-checkbox');
    await checkbox.check();
    await expect(page.getByTestId('active-count')).toHaveText('0 active');

    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    await expect(page.getByTestId('task-item')).not.toHaveClass(/completed/);
    await expect(page.getByTestId('active-count')).toHaveText('1 active');
  });

  test('deletes a task', async ({ page }) => {
    await page.getByTestId('task-input').fill('Temporary task');
    await page.getByTestId('add-task-btn').click();
    await expect(page.getByTestId('task-item')).toHaveCount(1);

    await page.getByTestId('delete-task-btn').click();
    await expect(page.getByTestId('task-item')).toHaveCount(0);
    await expect(page.getByTestId('empty-state')).toBeVisible();
    await expect(page.getByTestId('total-count')).toHaveText('0 tasks');
  });

  test('filters active tasks', async ({ page }) => {
    await page.getByTestId('task-input').fill('Active task');
    await page.getByTestId('add-task-btn').click();
    await page.getByTestId('task-input').fill('Completed task');
    await page.getByTestId('add-task-btn').click();

    await page.getByTestId('task-checkbox').last().check();
    await page.getByTestId('filter-active').click();

    await expect(page.getByTestId('task-item')).toHaveCount(1);
    await expect(page.getByTestId('task-text')).toHaveText('Active task');
  });

  test('filters completed tasks', async ({ page }) => {
    await page.getByTestId('task-input').fill('Done task');
    await page.getByTestId('add-task-btn').click();
    await page.getByTestId('task-checkbox').check();

    await page.getByTestId('filter-completed').click();

    await expect(page.getByTestId('task-item')).toHaveCount(1);
    await expect(page.getByTestId('task-text')).toHaveText('Done task');
    await expect(page.getByTestId('task-item')).toHaveClass(/completed/);
  });

  test('shows all tasks when All filter is selected', async ({ page }) => {
    await page.getByTestId('task-input').fill('Task A');
    await page.getByTestId('add-task-btn').click();
    await page.getByTestId('task-input').fill('Task B');
    await page.getByTestId('add-task-btn').click();
    await page.getByTestId('task-checkbox').last().check();

    await page.getByTestId('filter-active').click();
    await expect(page.getByTestId('task-item')).toHaveCount(1);

    await page.getByTestId('filter-all').click();
    await expect(page.getByTestId('task-item')).toHaveCount(2);
  });
});
