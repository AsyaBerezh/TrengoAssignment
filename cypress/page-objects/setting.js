/// <reference types="cypress" />
//cypress version of Page object
export function navigate() {
    cy.visit('https://app.trengo.com/auth/login');
}
export function login(email, password){
    cy.get('[name="email"]').click().type(email);
    cy.get('[name="password"]').click().type(password);
    cy.get('.success.rounded').click();
}
export function goToSettings() {
    cy.get('[data-test="main-navigation-settings"]').click();
}
export function collapseOption(settingGroupOption) {
    cy.get('.cursor-pointer i.collapse_icon').eq(settingGroupOption).click();
}
export function goToTeams() {
    cy.get('[href="/admin/teams"]').click();
}
export function addNewTeam() {
    cy.get('.material-icons.md-18').click();
}
export function writeTeamName() {
    cy.get('[data-test="create-team-name"]').click().type('teamName' + Math.random()); //can change later with faker.js library
}
export function ddTeamMember() {
    cy.get('[data-test="create-team-members"]').click().type('Anastasiia' + "{enter}");
}
export function addChannelsName(channelsName) {
    cy.get('[data-test="create-team-channels"]').type(channelsName + '{enter}').should('not.be.empty');
}
export function clickCreateTeamButton() {
    cy.get('[data-test="create-team-modal-submit"]').click();
}
export function checkTeamForm(){
    cy.get('.t-modal').should('not.exist');
}
export function checkInfoMessage(){
    cy.get('.growl-message').should('be.visible');
}
