import { LightningElement, track } from 'lwc';

/**
 * Assessment Detail Component for LWC OSS
 * This is a UI-only version with mock data
 */
export default class RtmvpcAssessmentDetail extends LightningElement {
    // Mock data for labels
    labels = {
        timeLine: 'Time Line',
        back: 'Back',
        details: 'Details',
        SP_Follow_Up: 'Follow Up',
        emails: 'Emails',
        startDate: 'Start Date',
        SP_Flagged: 'Flagged',
        SP_Approved: 'Approved',
        SP_Rejected: 'Rejected',
        SP_All: 'All',
        SP_Non_Preferred: 'Non Preferred',
        SP_Preferred: 'Preferred',
        SP_Rep_Acc: 'Representative Account',
        SP_AssessmentFindings: 'Assessment Findings'
    };

    // Assessment data
    assessmentData = {
        assessmentName: 'Tech Debt',
        endDate: '(Due date May-30-2025)',
        accountAssessmentStatus: 'In Review'
    };

    // Timeline data
    assessmentTimeline = [
        {
            status: 'In Review',
            date: 'May-29-2025 5:07:58 AM',
            name: 'User User',
            id: '005XXXXXXXXXXXXXXX',
            classlist:
                'cad-timeline_slidebase cad-timeline_customer cad-timeline_pending'
        },
        {
            status: 'Submitted',
            date: 'May-29-2025 5:07:09 AM',
            name: 'User User',
            id: '005XXXXXXXXXXXXXXX',
            classlist:
                'cad-timeline_slidebase cad-timeline_vendor cad-timeline_submited'
        },
        {
            status: 'In Progress',
            date: 'May-28-2025 4:43:07 AM',
            name: 'User User',
            id: '005XXXXXXXXXXXXXXX',
            classlist:
                'cad-timeline_slidebase cad-timeline_vendor cad-timeline_pending'
        },
        {
            status: 'Start Date',
            date: 'May-28-2025 00:00:00',
            name: 'User User',
            id: '005XXXXXXXXXXXXXXX',
            classlist:
                'cad-timeline_slidebase cad-timeline_customer cad-timeline_default'
        }
    ];

    // Assessment areas data - matches the screenshot
    assessmentAreas = [
        {
            id: 'area1',
            title: '13thMay Assessment Area',
            expanded: false,
            metrics: {
                totalCount: '2/2',
                completed: '100%',
                score: '0',
                followUps: '0',
                findings: '2',
                tasks: '1'
            }
        },
        {
            id: 'area2',
            title: '13thMay Assessment AreaV2',
            expanded: false,
            metrics: {
                totalCount: '1/1',
                completed: '100%',
                score: '0',
                followUps: '0',
                findings: '1',
                tasks: '0'
            }
        }
    ];

    // UI state properties
    @track viewResponse = true;
    @track isRightPanelOpen = false;
    @track showExpand = true;
    @track isTimelinePanelVisible = true;
    @track showEditIcon = true;
    @track showEditIconCustomer = true;
    @track displayHeader = 'Follow Up';
    @track showdownloadIcon = true;
    @track showFilterMenu = false;
    @track showExportMenu = false;
    @track openReviewComments = false;
    @track showCapaForm = false;
    @track openRightFile = false;
    @track openEmail = false;
    @track showModal = false;
    @track selectedItem = 'All';
    @track activeTab = 'responses';
    @track isIconDisabled = false;
    @track currentAreaId = null;
    @track showstatus = true; // Controls visibility of filter button

    connectedCallback() {
        this.checkScreenSize();
        window.addEventListener('resize', this.checkScreenSize.bind(this));

        // Set the showstatus based on assessment status
        // In a real implementation, this would be based on backend data
        this.assessmentTimeline.forEach((res) => {
            if (
                res.status === 'In Review' ||
                res.status === 'Need More Information' ||
                res.status === 'Review Completed'
            ) {
                this.showstatus = true;
            }
        });
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.checkScreenSize.bind(this));
    }

    checkScreenSize() {
        const isMobileView = window.innerWidth < 768;
        if (isMobileView) {
            this.isTimelinePanelVisible = false;
        }
    }

    // Computed properties for CSS classes
    get timelinePanelClass() {
        return this.isTimelinePanelVisible
            ? 'timeline-panel'
            : 'timeline-panel hidden';
    }

    get exportMenuClass() {
        return this.showExportMenu
            ? 'dropdown export-menu show'
            : 'dropdown export-menu';
    }

    get mockData() {
        return {
            isIconDisabled: this.isIconDisabled
        };
    }

    // Event handlers
    handleTabSwitch() {
        this.activeTab =
            this.activeTab === 'responses' ? 'reports' : 'responses';
        console.log(`Switched to tab: ${this.activeTab}`);
    }

    handleLeftButtonClick() {
        this.isTimelinePanelVisible = !this.isTimelinePanelVisible;
        console.log('Timeline panel visibility toggled');
    }

    handleRightButtonClick() {
        this.isRightPanelOpen = !this.isRightPanelOpen;
        console.log('Right panel visibility toggled');
    }

    // Method to toggle the filter menu
    toggleFilterMenu(event) {
        // Prevent the event from propagating
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        // Toggle the menu visibility
        this.showFilterMenu = !this.showFilterMenu;

        // Close export menu if open
        this.showExportMenu = false;

        console.log('Filter menu toggled:', this.showFilterMenu);
    }

    // Method to close any open menus
    closeAllMenus() {
        this.showFilterMenu = false;
        this.showExportMenu = false;
    }

    toggleExportMenu(event) {
        // Stop propagation to prevent immediate closing
        if (event) {
            event.stopPropagation();
        }

        this.showExportMenu = !this.showExportMenu;
        this.showFilterMenu = false;
    }

    // We use renderedCallback instead of addEventListener
    renderedCallback() {
        if (this._hasRendered) return;
        this._hasRendered = true;

        // Add click handler to the document body directly in the component
        this.template.addEventListener('click', (event) => {
            const filterButton = this.template.querySelector('.filter-button');
            const filterMenu = this.template.querySelector('.filter-menu');

            // If clicked outside filter menu and button, close the menu
            if (filterButton && filterMenu && this.showFilterMenu) {
                if (
                    !filterButton.contains(event.target) &&
                    !filterMenu.contains(event.target)
                ) {
                    this.showFilterMenu = false;
                }
            }
        });
    }

    handleAccordian(event) {
        const action = event.currentTarget.dataset.id;
        this.showExpand = !this.showExpand;
        console.log(`Accordion action: ${action}`);

        // Create a new array with all areas expanded or collapsed
        this.assessmentAreas = this.assessmentAreas.map((area) => {
            return { ...area, expanded: !this.showExpand };
        });
    }

    toggleAreaDetails(event) {
        const areaId = event.currentTarget.dataset.id;

        // Force the array to be reactive by creating a new array with the updated item
        this.assessmentAreas = this.assessmentAreas.map((area) => {
            if (area.id === areaId) {
                return { ...area, expanded: !area.expanded };
            }
            return area;
        });

        const area = this.assessmentAreas.find((a) => a.id === areaId);
        console.log(`Toggled area: ${areaId}, expanded: ${area.expanded}`);

        // Set this area as the current area for actions
        this.currentAreaId = areaId;
    }

    // Handle clicking on area title specifically
    handleAreaTitleClick(event) {
        // Prevent event from bubbling up to the area-header
        event.stopPropagation();

        // Get the area ID from the parent element's data attribute
        const areaHeader = event.currentTarget.closest('.area-header');
        if (areaHeader) {
            const areaId = areaHeader.dataset.id;

            // Force the array to be reactive by creating a new array with the updated item
            this.assessmentAreas = this.assessmentAreas.map((area) => {
                if (area.id === areaId) {
                    return { ...area, expanded: !area.expanded };
                }
                return area;
            });

            const area = this.assessmentAreas.find((a) => a.id === areaId);
            console.log(
                `Toggled area from title: ${areaId}, expanded: ${area.expanded}`
            );

            // Set this area as the current area for actions
            this.currentAreaId = areaId;
        }
    }

    handleEdit(event) {
        this.isIconDisabled = true;
        this.showEditIconCustomer = false;

        if (event.currentTarget.dataset.id === 'EditTrue') {
            this.showEditIcon = false;
            console.log('Edit mode enabled');
        } else {
            this.showEditIcon = true;
            console.log('Edit mode disabled');
        }

        // For demo purposes, we're immediately re-enabling the edit functionality
        // In a real implementation, this would be controlled by backend state
        this.isIconDisabled = false;
        this.showEditIconCustomer = true;
    }

    // Filter handlers
    handleChange(event) {
        this.selectedItem = event.currentTarget.dataset.id;
        this.showFilterMenu = false;
        console.log(`Filter changed to: ${this.selectedItem}`);
    }

    handleApproveChange(event) {
        this.selectedItem = event.currentTarget.dataset.id;
        this.showFilterMenu = false;
        console.log('Show approved items');
    }

    handleRejectChange(event) {
        this.selectedItem = event.currentTarget.dataset.id;
        this.showFilterMenu = false;
        console.log('Show rejected items');
    }

    // Action handlers
    handleSaveAction() {
        console.log('Save action triggered');
        // Add implementation for saving the assessment
    }

    handleCloseReviewAction() {
        console.log('Close review action triggered');
        // Add implementation for closing the review
    }

    // Export handlers
    handleExportPDF() {
        this.showExportMenu = false;
        console.log('Exporting as PDF');
        // Add implementation for PDF export
    }

    handleExportCSV() {
        this.showExportMenu = false;
        console.log('Exporting as CSV');
        // Add implementation for CSV export
    }

    // Modal functionality
    closeModal() {
        this.showModal = false;
    }

    // Right panel content handlers
    showComments(event) {
        this.currentAreaId = event.currentTarget.dataset.areaId;
        this.displayHeader = 'Comments';
        this.openReviewComments = true;
        this.showCapaForm = false;
        this.openRightFile = false;
        this.openEmail = false;
        this.isRightPanelOpen = true;

        if (window.innerWidth <= 768) {
            this.showModal = true;
        }
    }

    showFindings(event) {
        this.currentAreaId = event.currentTarget.dataset.areaId;
        this.displayHeader = 'Findings';
        this.openReviewComments = false;
        this.showCapaForm = true;
        this.openRightFile = false;
        this.openEmail = false;
        this.isRightPanelOpen = true;

        if (window.innerWidth <= 768) {
            this.showModal = true;
        }
    }

    showFiles(event) {
        this.currentAreaId = event.currentTarget.dataset.areaId;
        this.displayHeader = 'Files';
        this.openReviewComments = false;
        this.showCapaForm = false;
        this.openRightFile = true;
        this.openEmail = false;
        this.isRightPanelOpen = true;

        if (window.innerWidth <= 768) {
            this.showModal = true;
        }
    }

    showEmails(event) {
        this.currentAreaId = event.currentTarget.dataset.areaId;
        this.displayHeader = 'Emails';
        this.openReviewComments = false;
        this.showCapaForm = false;
        this.openRightFile = false;
        this.openEmail = true;
        this.isRightPanelOpen = true;

        if (window.innerWidth <= 768) {
            this.showModal = true;
        }
    }

    // CSS class getters for menu item highlighting
    get isAllSelected() {
        return this.selectedItem === 'All' ? 'highlight-menu-item' : '';
    }

    get isLowerFlagSelected() {
        return this.selectedItem === 'showlowerflag'
            ? 'highlight-menu-item'
            : '';
    }

    get isApprovedSelected() {
        return this.selectedItem === 'showapproved'
            ? 'highlight-menu-item'
            : '';
    }

    get isRejectedSelected() {
        return this.selectedItem === 'showrejected'
            ? 'highlight-menu-item'
            : '';
    }

    // Getter for the filter menu style
    get filterMenuStyle() {
        return this.showFilterMenu ? 'display: block;' : 'display: none;';
    }

    // New getter for the filter dropdown class
    get filterDropdownClass() {
        return this.showFilterMenu
            ? 'filter-dropdown filter-dropdown-visible'
            : 'filter-dropdown';
    }
}
