export function initializeTabs(onTabChange: (selectedTab: string) => void) {
    const tabButtons = document.querySelectorAll('input[name="btnradio"]');

    tabButtons.forEach((button) => {
        button.addEventListener('change', (event) => {
            const selectedTab = (event.target as HTMLInputElement).id;
            onTabChange(selectedTab);
        });
    });
}
