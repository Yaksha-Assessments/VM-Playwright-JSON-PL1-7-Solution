import { test } from "playwright/test";
import { Page, Locator, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { MyInfoPage } from "src/pages/MyInfoPage";

test.describe("Yaksha", () => {
  let loginPage: LoginPage;
  let myinfoPage: MyInfoPage;
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(" ");
    loginPage = new LoginPage(page);
    myinfoPage = new MyInfoPage(page);
    await loginPage.performLogin();

  });

  /**
 * Test Case 1: Verify that a new Qualification can be added to a user's record
 *
 * Purpose:
 * Ensures that a user can successfully add a new qualification entry with specified company and job title.
 *
 * Steps:
 * 1. Generate a unique company name for input.
 * 2. Navigate to the "My Info" > Qualifications section.
 * 3. Fill out and submit the form with company and job title.
 * 4. Retrieve the list of qualification entries.
 * 5. Assert that the list contains the newly added company name.
 */

  test("TS_1 Verify New 'Qualification' could be added to the record of user", async ({ page }) => {
  const compnameInput = generateUniqueCompanyName();
  const jobTitle = "bb22";
  await myinfoPage.addQualification(compnameInput, jobTitle);
  const qualifications = await page.locator("//div[@class='oxd-table-row oxd-table-row--with-border']/div[2]").allInnerTexts();
  expect(qualifications && qualifications.length > 0).toBeTruthy();
  expect(qualifications).toContain(compnameInput);
});

  /**
 * Test Case: Verify New 'Qualification' added could be edited from the record of user
 *
 * Purpose:
 * Ensures that a qualification entry can be edited and the update is reflected in the list.
 *
 * Steps:
 * 1. Navigate to the qualification section.
 * 2. Edit the first entry with new company name.
 * 3. Verify the updated company name appears in the list.
 */


  test.only("TS-2 Verify New 'Qualification' added could be edited from the record of user ", async ({ page }) => {
    const editInput = generateUniqueEditName();
   await myinfoPage.editQualification(editInput);
   const editlist= await  page.locator("//div[@class='oxd-table-row oxd-table-row--with-border']/div[2]").allInnerTexts();
    expect(editlist && editlist.length > 0).toBeTruthy();

    expect(editlist).toContain(editInput);
    
  });

  /**
 * Test Case: Verify the qualification could be deleted
 *
 * Purpose:
 * Validates that a qualification entry added to the user's record can be deleted successfully.
 *
 * Steps:
 * 1. Generate a unique company name for the qualification.
 * 2. Add the qualification using the generated company name and job title.
 * 3. Locate and trigger the delete action for the added qualification.
 * 4. Confirm the deletion.
 * 5. Retrieve the list of remaining qualifications.
 * 6. Assert that the deleted qualification no longer appears in the list.
 */


  test("TS-3 Verify the qualification could be deleted", async ({
    page,
  }) => {
    const delUser = generateUniqueCompanyName();
    const jobTitle = "bb22";
    await  myinfoPage.deleteQualification(delUser,jobTitle)
    const delList = await page.locator("//div[@class='oxd-table-row oxd-table-row--with-border']/div[2]").allInnerTexts();
    expect(delList && delList.length > 0).toBeTruthy();
    expect(delList).not.toContain(delUser);
  });

 /**
 * Test Case: Verify the qualification select delete functionality
 *
 * Purpose:
 * Ensures that multiple qualifications can be selected and deleted successfully.
 *
 * Steps:
 * 1. Navigate to the user's qualification section.
 * 2. Trigger selection of multiple qualifications using checkboxes.
 * 3. Initiate and confirm the delete action.
 * 4. Capture the toast message after deletion.
 * 5. Assert that the success message confirms the deletion.
 */


  test("TS-4 Verify the qualification select delete functionality", async ({ page }) => {
  await myinfoPage.deleteMultiple();
  const successMessage = await page.locator('.oxd-toast').nth(0).textContent();
   expect(successMessage && successMessage.length > 0).toBeTruthy();

  expect(successMessage).toContain("SuccessSuccessfully Deleted×");
});

  /**
 * Test Case 5: Verify New 'Education' could be added to the record of user
 *
 * Purpose:
 * Validates that a user can successfully add a new education entry to their qualification record.
 *
 * Steps:
 * 1. Generate a unique GPA value.
 * 2. Navigate to the Education section and fill in required fields.
 * 3. Submit the education form.
 * 4. Capture the updated education list.
 * 5. Assert that the new GPA value appears in the list.
 */


  test("TS-5 Verify New 'Education' could be added to the record of user", async ({
    page,
  }) => {
    const GPA = generateUniqueGPA();
   await myinfoPage.addEducation(GPA);
   const GPAList = await  page.locator("//div[@class='oxd-table-row oxd-table-row--with-border']/div[4]").allInnerTexts();
   expect(GPAList && GPAList.length > 0).toBeTruthy();

    expect(GPAList).toContain(GPA);
   
  });

 /**
 * Test Case: TS-6 Verify New 'Education' added could be edited from the record of user
 *
 * Purpose:
 * Ensures that a user can update an existing education record successfully.
 *
 * Steps:
 * 1. Generate a new GPA value for editing.
 * 2. Navigate to the Education section and click the edit button.
 * 3. Update the GPA field with the new value.
 * 4. Save the changes and capture the updated education list.
 * 5. Assert that the new GPA value appears in the list.
 */


  test("TS-6 Verify New 'Education' added could be edited from the record of user", async ({
    page,
  }) => {

    const GPA = generateUniqueGPA();
     await myinfoPage.editEducation(GPA);
    const editGPAList = await page.locator("//div[@class='oxd-table-row oxd-table-row--with-border']/div[4]").allInnerTexts();
    expect(editGPAList && editGPAList.length > 0).toBeTruthy();

    expect(editGPAList).toContain(GPA);
    
  });

 /**
 * Test Case: TS-7 Verify New 'Language' could be added to the record of user
 *
 * Purpose:
 * Validates that a user can successfully add a new language entry under the Qualifications section.
 *
 * Steps:
 * 1. Generate a unique comment as input.
 * 2. Navigate to the Language section and initiate the add flow.
 * 3. Select language options from dropdowns.
 * 4. Fill in the comment field and save.
 * 5. Verify that the newly added comment is present in the language table.
 **/


  test("TS-7 Verify New 'Language' could be added to the record of user", async ({ page }) => {
    const comment = generateUniqueComment();
     await myinfoPage.addLanguage(comment);
     const table = page.locator("//div[@class='orangehrm-container']");
   const commentList = await table.nth(3).locator("//div[@role = 'row'][1]/div[5]/div").allInnerTexts();
    expect(commentList && commentList.length > 0).toBeTruthy();

    expect(commentList).toContain(comment);
   
  });

 /**
 * Test Case: TS-8 Verify New 'Language' could be deleted from the record of user
 *
 * Purpose:
 * Confirms that a user can delete a specific language qualification entry successfully.
 *
 * Steps:
 * 1. Generate a unique comment and add it as a new language entry.
 * 2. Locate and delete the entry by matching the comment.
 * 3. Fetch the updated list of language comments.
 * 4. Assert that the deleted comment is no longer present in the list.
 */


  test("TS-8 Verify New 'Language' could be delegted to the record of user", async ({ page }) => {
    const editComment =generateUniqueComment();
     await myinfoPage.deleteLanguage(editComment);
     const table = page.locator("//div[@class='orangehrm-container']");
   const editCommentList = await table.nth(3).locator("//div[@role = 'row'][1]/div[5]/div").allInnerTexts();
    expect(editCommentList && editCommentList.length > 0).toBeTruthy();
    expect(editCommentList).not.toContain(editComment);
});


 /**
 * Test Case: TS-9 Verify the 'Skills' could be added to the record
 *
 * Purpose:
 * Ensures that a user can successfully add a new skill with a specific year of experience.
 *
 * Steps:
 * 1. Generate a random year value to ensure uniqueness.
 * 2. Navigate to the Skills section and add a new skill entry with the given year.
 * 3. Retrieve the list of years displayed for existing skills.
 * 4. Assert that the newly added year is present in the list.
 */


  test("TS-9 Verify the 'Skills' could be added to the record", async ({
    page,
  }) => {
    const year = randomYear();
    await myinfoPage.addSkills(year);
    const table = await page.locator("//div[@class='orangehrm-container']");
    const yearList =await  table.nth(2).locator("//div[@role = 'row'][1]/div[3]/div").allInnerTexts();
    expect(yearList && yearList.length > 0).toBeTruthy();
    expect(yearList).toContain(year.toString());
   
  });

 /**
 * Test Case: TS-10 Verify the 'Skills' could be edited from the record
 *
 * Purpose:
 * Ensures that an existing skill record can be updated with a new year value.
 *
 * Steps:
 * 1. Generate a random year value for editing.
 * 2. Navigate to the Skills section and trigger edit for the first skill entry.
 * 3. Update the year field and save the changes.
 * 4. Fetch the updated list of years and verify the new year is reflected.
 */


  test("TS-10 Verify the 'Skills' could be edited from the record", async ({ page }) => {
  const editYear = randomYear();
  await myinfoPage.editSkills(editYear);
  const table = await page.locator("//div[@class='orangehrm-container']");
    const edityearlist =await  table.nth(2).locator("//div[@role = 'row'][1]/div[3]/div").allInnerTexts();
  expect(edityearlist && edityearlist.length > 0).toBeTruthy();
  expect(edityearlist).toContain(editYear.toString());
});

});

/**
 * ------------------------------------------------------Helper Methods----------------------------------------------------
 */
function generateUniqueCompanyName(prefix: string = "Comp"): string {
    const timestamp = Date.now(); // Use timestamp to ensure uniqueness
    return `${prefix}_${timestamp}`;
  }
  //
  function generateUniqueEditName(prefix: string = "edit"): string {
    const timestamp = Date.now(); // Use timestamp to ensure uniqueness
    return `${prefix}_${timestamp}`;
  }
  function generateUniqueGPA(prefix: string = "GPA"): string {
    const timestamp = Date.now(); // Use timestamp to ensure uniqueness
    return `${prefix}_${timestamp}`;
  }
  function randomYear(): number{
    return Math.floor(Math.random() * 100) +1;


  }
  function generateUniqueComment(prefix: string = "GPA"): string {
    const timestamp = Date.now(); // Use timestamp to ensure uniqueness
    return `${prefix}_${timestamp}`;
  }
  function generateUniqueEditComment(prefix: string = "GPA"): string {
    const timestamp = Date.now(); // Use timestamp to ensure uniqueness
    return `${prefix}_${timestamp}`;
  }