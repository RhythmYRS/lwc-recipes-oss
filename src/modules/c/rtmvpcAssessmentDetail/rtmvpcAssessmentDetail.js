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
        SP_AssessmentFindings: 'Assessment Findings',
        // Add new metric labels
        totalCount: 'Total Count',
        completed: 'Completed',
        score: 'Score',
        followUps: 'Follow-Ups',
        findings: 'Findings',
        tasks: 'Tasks'
    };

    // Metrics data array
    metricsData = [
        {
            id: 'tech_arch',
            metrics: {
                totalCount: 10,
                completed: '75%',
                score: '85%',
                followUps: 2,
                findings: 3,
                tasks: 4
            }
        },
        {
            id: 'security',
            metrics: {
                totalCount: 8,
                completed: '60%',
                score: '90%',
                followUps: 1,
                findings: 2,
                tasks: 3
            }
        },
        {
            id: 'performance',
            metrics: {
                totalCount: 12,
                completed: '85%',
                score: '78%',
                followUps: 3,
                findings: 4,
                tasks: 2
            }
        }
    ];

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
            date: 'July',
            day: '29',
            time: '5:07:58\nAM',
            name: 'User User',
            id: '005XXXXXXXXXXXXXXX1',
            classlist:
                'cad-timeline_slidebase cad-timeline_customer cad-timeline_pending',
            isInReview: true,
            isSubmitted: false,
            isInProgress: false,
            isStartDate: false
        },
        {
            status: 'Submitted',
            date: 'July',
            day: '29',
            time: '5:07:09\nAM',
            name: 'User User',
            id: '005XXXXXXXXXXXXXXX2',
            classlist:
                'cad-timeline_slidebase cad-timeline_vendor cad-timeline_submited',
            isInReview: false,
            isSubmitted: true,
            isInProgress: false,
            isStartDate: false
        },
        {
            status: 'In Progress',
            date: 'July',
            day: '28',
            time: '4:43:07\nAM',
            name: 'User User',
            id: '005XXXXXXXXXXXXXXX3',
            classlist:
                'cad-timeline_slidebase cad-timeline_vendor cad-timeline_inprogress',
            isInReview: false,
            isSubmitted: false,
            isInProgress: true,
            isStartDate: false
        },
        {
            status: 'Start Date',
            date: 'July',
            day: '28',
            time: '9:07:58\nAM',
            name: 'User User',
            id: '005XXXXXXXXXXXXXXX4',
            classlist:
                'cad-timeline_slidebase cad-timeline_customer cad-timeline_default',
            isInReview: false,
            isSubmitted: false,
            isInProgress: false,
            isStartDate: true
        }
    ];

    // Assessment areas data - matches the screenshot
    assessmentAreas = [
        {
            id: '1',
            title: 'Technical Architecture',
            question:
                'What are the current technical debt challenges in your system architecture?',
            expanded: false,
            response: '',
            responseSaved: false,
            responseError: false,
            metricsId: 'tech_arch' // Reference to metrics data
        },
        {
            id: '2',
            title: 'Security Assessment',
            question:
                'What security measures are currently implemented in your system?',
            expanded: false,
            response: '',
            responseSaved: false,
            responseError: false,
            metricsId: 'security' // Reference to metrics data
        },
        {
            id: '3',
            title: 'Performance Analysis',
            question:
                'What are the current performance bottlenecks in your application?',
            expanded: false,
            response: '',
            responseSaved: false,
            responseError: false,
            metricsId: 'performance' // Reference to metrics data
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
    @track showTasksSection = false; // New property for Tasks section visibility
    @track isEditing = false; // New property to control edit mode
    @track isFindingModalOpen = false; // Property to control new finding modal visibility
    @track isTaskModalOpen = false; // Property to control new task modal visibility
    @track isFindingCreated = false; // Property to track if a finding has been successfully created

    // Properties to store new finding form data
    @track findingName = '';
    @track findingType = '';
    @track findingDescription = '';
    @track rootCause = '';
    @track repeatFinding = '';
    @track resolutionTimeFrame = '';
    @track assessmentArea = '';
    @track status = '';
    @track uploadedFiles = []; // Property to store uploaded files for findings

    // Properties to store new task form data
    @track taskSubject = '';
    @track taskComments = '';
    @track taskDueDate = '';
    @track taskPriority = '';
    @track taskStatus = '';
    @track taskAssignedTo = '';
    @track taskUploadedFiles = []; // Property to store uploaded files for tasks

    // Map to track findings created per assessment area
    @track findingsCreatedMap = {};
    @track tasksCreatedMap = {};

    // Track comments for the chat-like interface
    @track chatMessages = [
        {
            id: 'msg1',
            sender: 'System Admin',
            content: 'Assessment started. Please review all sections.',
            timestamp: 'May-28-2025',
            position: 'left' // System Admin messages always on left
        },
        {
            id: 'msg2',
            sender: 'User',
            content:
                'This assessment needs additional details on technical debt requirements.',
            timestamp: 'May-29-2025',
            position: 'right' // User messages always on right
        }
    ];

    @track newChatMessage = '';

    // Computed property to check if not in editing mode
    get isNotEditing() {
        return !this.isEditing;
    }

    // Computed property to check if finding has been created for current area
    get hasCreatedFindingForCurrentArea() {
        return this.findingsCreatedMap[this.currentAreaId] === true;
    }

    // Computed property to check if task has been created for current area
    get hasCreatedTaskForCurrentArea() {
        return this.hasTasksForCurrentArea();
    }

    // Finding data array
    @track assessmentFindings = [
        {
            id: 'finding1',
            name: 'Technical Debt Assessment',
            description:
                'Current technical debt includes legacy systems that need modernization.',
            type: 'Major Non-Conformance',
            rootCause: 'Process issue',
            repeatFinding: 'No',
            resolutionTimeFrame: '30 days',
            assessmentArea: 'Technical Architecture',
            status: 'Open'
        },
        {
            id: 'finding2',
            name: 'System Integration',
            description: 'Integration between systems requires optimization.',
            type: 'Minor Non-Conformance',
            rootCause: 'Equipment failure',
            repeatFinding: 'No',
            resolutionTimeFrame: '15 days',
            assessmentArea: 'Security Assessment',
            status: 'In Progress'
        }
    ];

    // Task data
    @track assessmentTasks = [
        {
            id: 'task1',
            subject: 'Tech Debt',
            comments: 'Review technical debt identified in the assessment.',
            dueDate: '2025-05-29'
        },
        {
            id: 'task2',
            subject: 'System Integration',
            comments: 'Follow up on system integration findings.',
            dueDate: '2025-06-15'
        }
    ];

    // Track save timeout
    saveTimeout;

    // Initialize assessment areas with computed metrics
    connectedCallback() {
        // Add computed metrics to each area
        this.assessmentAreas = this.assessmentAreas.map((area) => {
            const metrics = this.metricsData.find(
                (m) => m.id === area.metricsId
            )?.metrics;
            return {
                ...area,
                get displayQuestion() {
                    return area.question || 'No question available';
                },
                computedMetrics: metrics || {
                    totalCount: 0,
                    completed: '0%',
                    score: '0%',
                    followUps: 0,
                    findings: 0,
                    tasks: 0
                }
            };
        });

        this.checkScreenSize();
        window.addEventListener('resize', this.checkScreenSize.bind(this));

        // Set the showstatus based on assessment status
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
        // If timeline panel is being opened and right panel is open, close right panel
        if (this.isTimelinePanelVisible && this.isRightPanelOpen) {
            this.isRightPanelOpen = false;
        }
        console.log(
            'Timeline panel visibility toggled, isTimelinePanelVisible:',
            this.isTimelinePanelVisible
        );
    }

    handleRightButtonClick() {
        this.isRightPanelOpen = !this.isRightPanelOpen;
        // If right panel is being opened and timeline panel is visible, close timeline panel
        if (this.isRightPanelOpen && this.isTimelinePanelVisible) {
            this.isTimelinePanelVisible = false;
        }
        console.log(
            'Right panel visibility toggled, isRightPanelOpen:',
            this.isRightPanelOpen
        );
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
            const exportButton = this.template.querySelector('.export-button');
            const exportMenu = this.template.querySelector(
                '.' + this.exportMenuClass.split(' ')[0]
            );

            // If clicked outside filter menu and button, close the menu
            if (filterButton && filterMenu && this.showFilterMenu) {
                if (
                    !filterButton.contains(event.target) &&
                    !filterMenu.contains(event.target)
                ) {
                    this.showFilterMenu = false;
                }
            }

            // If clicked outside export menu and button, close the menu
            if (exportButton && exportMenu && this.showExportMenu) {
                if (
                    !exportButton.contains(event.target) &&
                    !exportMenu.contains(event.target)
                ) {
                    this.showExportMenu = false;
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
        this.displayHeader = 'Follow-Ups';
        this.openReviewComments = true;
        this.showCapaForm = false;
        this.openRightFile = false;
        this.openEmail = false;
        this.showTasksSection = false;
        this.isRightPanelOpen = true;

        // Close timeline panel when right panel opens
        if (this.isTimelinePanelVisible) {
            this.isTimelinePanelVisible = false;
        }

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
        this.showTasksSection = false;
        this.isRightPanelOpen = true;

        // Close timeline panel when right panel opens
        if (this.isTimelinePanelVisible) {
            this.isTimelinePanelVisible = false;
        }

        if (window.innerWidth <= 768) {
            this.showModal = true;
        }
    }

    // Method to handle the combined Findings and Tasks button
    showFindingsAndTasks(event) {
        // Get the assessment area ID from the clicked button
        this.currentAreaId = event.currentTarget.dataset.areaId;

        // Always display the findings form, tasks will be shown below when created
        this.displayHeader = 'Findings & Tasks';
        this.openReviewComments = false;
        this.showCapaForm = true; // Always show findings form
        this.openRightFile = false;
        this.openEmail = false;
        this.showTasksSection = false; // Tasks are shown within the findings form if they exist
        this.isRightPanelOpen = true;

        // Check if a finding already exists for this SPECIFIC area
        const hasFinding = this.hasFindingsForCurrentArea();

        // Set isFindingCreated based on current area's findings
        this.isFindingCreated = hasFinding;

        // Close timeline panel when right panel opens
        if (this.isTimelinePanelVisible) {
            this.isTimelinePanelVisible = false;
        }

        console.log(
            `Showing findings panel for area: ${this.currentAreaId}, finding exists: ${hasFinding}, count: ${this.findingsForCurrentArea.length}`
        );

        if (window.innerWidth <= 768) {
            this.showModal = true;
        }
    }

    showTasks(event) {
        this.currentAreaId = event.currentTarget.dataset.areaId;
        this.displayHeader = 'Task Details';
        this.openReviewComments = false;
        this.showCapaForm = false;
        this.openRightFile = false;
        this.openEmail = false;
        this.showTasksSection = true;
        this.isRightPanelOpen = true;

        // Close timeline panel when right panel opens
        if (this.isTimelinePanelVisible) {
            this.isTimelinePanelVisible = false;
        }

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
        this.showTasksSection = false;
        this.isRightPanelOpen = true;

        // Close timeline panel when right panel opens
        if (this.isTimelinePanelVisible) {
            this.isTimelinePanelVisible = false;
        }

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

    // New methods for creating findings and tasks
    handleCreateFinding() {
        console.log(
            'Create New Finding button clicked for area:',
            this.currentAreaId
        );
        // Add logic here to open a form or perform action to create a new finding
        this.resetFindingForm(); // Clear previous data
        this.isFindingModalOpen = true;
    }

    handleCloseFindingModal() {
        this.isFindingModalOpen = false;

        // If we manually close the modal (cancel button), we still want to check
        // if there was already a finding created and make sure UI reflects that
        if (this.findingsCreatedMap[this.currentAreaId]) {
            // Force a reactive update by recreating the findingsCreatedMap
            this.findingsCreatedMap = { ...this.findingsCreatedMap };

            // Show the tasks section if a finding was already created for this area
            this.showCapaForm = false;
            this.showTasksSection = true;
            this.isRightPanelOpen = true;

            console.log('Modal closed - Finding exists, showing tasks section');
        } else {
            // If no finding was created, keep showing the findings form
            this.showCapaForm = true;
            this.showTasksSection = false;

            console.log(
                'Modal closed - No finding yet, keeping findings form visible'
            );
        }
    }

    // Handle input changes for Finding form
    handleInputChange(event) {
        const field = event.target.dataset.field;
        const value = event.target.value;
        this[field] = value;
        console.log(`Field ${field} updated to: ${value}`);
    }

    // Helper method to get findings for current area
    get findingsForCurrentArea() {
        return this.assessmentFindings.filter(
            (finding) => finding.areaId === this.currentAreaId
        );
    }

    // Helper method to get tasks for current area
    get tasksForCurrentArea() {
        return this.assessmentTasks.filter(
            (task) => task.areaId === this.currentAreaId
        );
    }

    // Helper method to check if the current area has any findings
    hasFindingsForCurrentArea() {
        const findings = this.assessmentFindings.filter(
            (finding) => finding.areaId === this.currentAreaId
        );
        return findings && findings.length > 0;
    }

    // Helper method to check if the current area has any tasks
    hasTasksForCurrentArea() {
        const tasks = this.assessmentTasks.filter(
            (task) => task.areaId === this.currentAreaId
        );
        return tasks && tasks.length > 0;
    }

    handleSaveFinding() {
        console.log('Save Finding clicked - Current field values:', {
            findingName: this.findingName,
            findingType: this.findingType,
            findingDescription: this.findingDescription,
            rootCause: this.rootCause,
            repeatFinding: this.repeatFinding,
            resolutionTimeFrame: this.resolutionTimeFrame,
            assessmentArea: this.assessmentArea,
            status: this.status
        });

        // Basic validation for mandatory fields
        const mandatoryFields = [
            'findingName',
            'findingType',
            'findingDescription',
            'rootCause',
            'repeatFinding',
            'resolutionTimeFrame',
            'assessmentArea',
            'status'
            // 'Upload' is not mandatory
        ];
        let allFieldsValid = true;
        const missingFields = [];
        mandatoryFields.forEach((field) => {
            if (!this[field]) {
                allFieldsValid = false;
                missingFields.push(field);
                console.error(
                    `${field} is mandatory and missing. Current value:`,
                    this[field]
                );
            }
        });

        if (allFieldsValid) {
            // Create a new finding object
            const newFinding = {
                id: 'finding' + Date.now(), // Generate a unique ID
                name: this.findingName,
                type: this.findingType,
                description: this.findingDescription,
                rootCause: this.rootCause,
                repeatFinding: this.repeatFinding,
                resolutionTimeFrame: this.resolutionTimeFrame,
                assessmentArea: this.assessmentArea,
                status: this.status,
                areaId: this.currentAreaId // Store the assessment area ID with the finding
            };

            console.log('Saving Finding:', newFinding);

            // Close modal before updating state
            this.isFindingModalOpen = false;

            // Add the finding to the assessmentFindings array
            this.assessmentFindings = [...this.assessmentFindings, newFinding];

            // Mark this assessment area as having a finding - force reactivity with Object.assign
            this.findingsCreatedMap = Object.assign(
                {},
                this.findingsCreatedMap,
                { [this.currentAreaId]: true }
            );

            // Update the display header to reflect the new state
            this.displayHeader = 'Findings & Tasks';

            // Show the findings panel with create task button
            const currentAreaId = this.currentAreaId;
            this.showCapaForm = true; // Keep showing findings section
            this.showTasksSection = false; // Don't show tasks section yet

            // Use Promise to update UI in next microtask
            Promise.resolve().then(() => {
                this.currentAreaId = currentAreaId;

                // Show success toast after UI has been updated
                this.showCustomToast(
                    'Success',
                    'Finding created successfully! You can now create a task.',
                    'success'
                );
            });

            this.isFindingCreated = true; // Set flag to indicate a finding has been created
        } else {
            console.error('Please fill in all mandatory fields.');
            // Show custom error toast
            this.showCustomToast(
                'Error',
                'Please fill all the required fields.',
                'error'
            );
        }
    }

    handleUploadButtonClick() {
        // Find the hidden file input and click it programmatically
        this.template.querySelector('.file-input').click();
    }

    handleFileUpload(event) {
        // Store the selected files
        this.uploadedFiles = event.target.files;
        console.log('Files selected:', this.uploadedFiles);
        // You might want to display the selected file names to the user
    }

    // Properties and method for custom toast
    @track isCustomToastVisible = false;
    @track customToastMessage = '';
    @track customToastVariant = ''; // 'success' or 'error'
    toastTimeout; // Property to store the timeout reference

    showCustomToast(title, message, variant) {
        this.customToastMessage = `${title}: ${message}`;
        this.customToastVariant = variant;
        this.isCustomToastVisible = true;

        // Clear any existing timeout
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }

        // Auto-dismiss after 3 seconds
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.toastTimeout = setTimeout(() => {
            this.closeCustomToast();
        }, 3000);
    }

    closeCustomToast() {
        this.isCustomToastVisible = false;

        // Clear the timeout when manually closing
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
            this.toastTimeout = null;
        }
    }

    // Computed properties for toast icons
    get isSuccessToast() {
        return this.customToastVariant === 'success';
    }

    get isErrorToast() {
        return this.customToastVariant === 'error';
    }

    // Computed property for toast classes
    get toastClasses() {
        let classes = 'custom-toast';
        if (this.customToastVariant === 'success') {
            classes += ' custom-toast-success';
        } else if (this.customToastVariant === 'error') {
            classes += ' custom-toast-error';
        }
        return classes;
    }

    resetFindingForm() {
        this.findingName = '';
        this.findingType = '';
        this.findingDescription = '';
        this.rootCause = '';
        this.repeatFinding = '';
        this.resolutionTimeFrame = '';
        this.assessmentArea = '';
        this.status = '';
        this.uploadedFiles = [];
    }

    handleCreateTask() {
        console.log(
            'Create New Task button clicked for area:',
            this.currentAreaId
        );

        // First check if there's a finding for this area
        if (!this.hasFindingsForCurrentArea()) {
            // If no finding exists, show error message and prompt to create a finding first
            this.showCustomToast(
                'Error',
                'You must create a finding for this area before creating a task.',
                'error'
            );
            return;
        }

        this.resetTaskForm(); // Clear previous data
        this.isTaskModalOpen = true;
    }

    handleCloseTaskModal() {
        this.isTaskModalOpen = false;
    }

    // Handle input changes for Task form
    handleTaskInputChange(event) {
        const field = event.target.dataset.field;
        this[field] = event.target.value;
    }

    handleTaskUploadButtonClick() {
        // Find the hidden file input for tasks and click it programmatically
        this.template.querySelector('.task-file-input').click();
    }

    handleTaskFileUpload(event) {
        // Store the selected files for tasks
        this.taskUploadedFiles = event.target.files;
        console.log('Task Files selected:', this.taskUploadedFiles);
        // You might want to display the selected file names to the user
    }

    handleSaveTask() {
        // Basic validation for mandatory task fields
        const mandatoryTaskFields = [
            'taskSubject',
            'taskDueDate',
            'taskPriority',
            'taskStatus',
            'taskAssignedTo'
        ];
        let allTaskFieldsValid = true;
        mandatoryTaskFields.forEach((field) => {
            if (!this[field]) {
                allTaskFieldsValid = false;
                console.error(`${field} is mandatory for Task.`);
            }
        });

        if (allTaskFieldsValid) {
            // Create a new task object
            const newTask = {
                id: 'task' + Date.now(), // Generate a unique ID
                subject: this.taskSubject,
                comments: this.taskComments,
                dueDate: this.taskDueDate,
                priority: this.taskPriority,
                status: this.taskStatus,
                assignedTo: this.taskAssignedTo,
                areaId: this.currentAreaId // Store the assessment area ID with the task
            };

            // Add the new task to the assessmentTasks array
            this.assessmentTasks = [...this.assessmentTasks, newTask];

            console.log('Saving Task:', newTask);

            // Mark this assessment area as having a task
            this.tasksCreatedMap = Object.assign({}, this.tasksCreatedMap, {
                [this.currentAreaId]: true
            });

            // Keep the right panel open, showing both findings and tasks
            this.showCapaForm = true; // Keep showing findings section
            this.showTasksSection = false; // We're already showing tasks within the findings section
            this.isRightPanelOpen = true;

            // Close the modal and show toast
            this.handleCloseTaskModal(); // Close modal after saving
            this.showCustomToast(
                'Success',
                'Task created successfully!',
                'success'
            );
        } else {
            console.error('Please fill in all mandatory task fields.');
            this.showCustomToast(
                'Error',
                'Please fill all the required task fields.',
                'error'
            );
        }
    }

    resetTaskForm() {
        this.taskSubject = '';
        this.taskComments = '';
        this.taskDueDate = '';
        this.taskPriority = '';
        this.taskStatus = '';
        this.taskAssignedTo = '';
        this.taskUploadedFiles = [];
    }

    handleResponseChange(event) {
        const areaId = event.target.dataset.areaId;
        const response = event.target.value;

        // Find the area in assessmentAreas array
        const areaIndex = this.assessmentAreas.findIndex(
            (area) => area.id === areaId
        );
        if (areaIndex !== -1) {
            // Update the response
            this.assessmentAreas[areaIndex].response = response;
            this.assessmentAreas[areaIndex].responseSaved = false;
            this.assessmentAreas[areaIndex].responseError = false;

            // Save the response immediately
            this.saveResponse(areaId);
        }
    }

    async saveResponse(areaId) {
        try {
            // Here you would typically make an Apex call to save the response
            // For now, we'll simulate a successful save
            const areaIndex = this.assessmentAreas.findIndex(
                (area) => area.id === areaId
            );
            if (areaIndex !== -1) {
                // Simulate API call
                await this.simulateApiCall();
                this.assessmentAreas[areaIndex].responseSaved = true;
                this.assessmentAreas[areaIndex].responseError = false;
            }
        } catch (error) {
            console.error('Error saving response:', error);
            const areaIndex = this.assessmentAreas.findIndex(
                (area) => area.id === areaId
            );
            if (areaIndex !== -1) {
                this.assessmentAreas[areaIndex].responseSaved = false;
                this.assessmentAreas[areaIndex].responseError = true;
            }
        }
    }

    simulateApiCall() {
        return new Promise((resolve) => {
            // Simulate a network delay
            resolve();
        });
    }

    toggleEditMode() {
        this.isEditing = !this.isEditing;
        console.log(`Edit mode toggled: ${this.isEditing}`);

        // Expand/collapse all areas based on the new editing state
        this.assessmentAreas = this.assessmentAreas.map((area) => ({
            ...area,
            expanded: this.isEditing
        }));

        // Update the expand/collapse all button state
        this.showExpand = !this.isEditing;
    }

    // Handle input change for chat message
    handleChatInputChange(event) {
        this.newChatMessage = event.target.value;
    }

    // Send new chat message
    handleSendChatMessage() {
        if (!this.newChatMessage.trim()) return;

        // Create a new message
        const position = this.getNextMessagePosition();
        const sender = position === 'left' ? 'System Admin' : 'User';

        const newMessage = {
            id: 'msg' + Date.now(),
            sender: sender, // Set sender based on position
            content: this.newChatMessage,
            timestamp: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
            position: position // Alternating positions
        };

        // Add to chat messages
        this.chatMessages = [...this.chatMessages, newMessage];

        // Clear input
        this.newChatMessage = '';

        // Show success toast
        // this.showCustomToast('Success', 'Message sent', 'success');
    }

    // Helper method to determine next message position
    getNextMessagePosition() {
        const length = this.chatMessages.length;
        if (length % 2 === 0) {
            return 'left';
        }
        return 'right';
    }

    // Handle Enter key press in chat input
    handleChatKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSendChatMessage();
        }
    }

    // Compute full class for chat message based on position
    getChatMessageClass(message) {
        if (message.position === 'left') {
            return 'chat-message chat-message-left';
        }
        return 'chat-message chat-message-right';
    }

    // Computed property for the chat messages with proper classes
    get chatMessagesWithClasses() {
        return this.chatMessages.map((message) => {
            return {
                ...message,
                cssClass: this.getChatMessageClass(message)
            };
        });
    }

    // Tab-related getters
    get responsesTabClass() {
        if (this.activeTab === 'responses') {
            return 'tab active';
        }
        return 'tab';
    }

    get reportsTabClass() {
        if (this.activeTab === 'reports') {
            return 'tab active';
        }
        return 'tab';
    }

    get isResponsesTabActive() {
        return this.activeTab === 'responses';
    }

    get isReportsTabActive() {
        return this.activeTab === 'reports';
    }
}
