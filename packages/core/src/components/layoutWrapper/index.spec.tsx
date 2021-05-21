import React from "react";
import { LayoutWrapper } from "@components/layoutWrapper";
import { IAdminContextProvider } from "../../contexts/admin/IAdminContext";
import { render, screen, TestWrapper, MockJSONServer } from "@test";
import { Route } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { LayoutProps } from "src/interfaces";

const renderWithAdminContext = (
    children: React.ReactNode,
    adminProvider: IAdminContextProvider,
) => {
    return render(<Route path="/">{children}</Route>, {
        wrapper: TestWrapper({
            dataProvider: MockJSONServer,
            resources: [{ name: "posts", route: "posts" }],
            routerInitialEntries: ["/"],
            adminProvider,
        }),
    });
};

describe("LayoutWrapper", () => {
    test("LayoutWrapper renders the custom components if Layout is given as DefaultLayout", () => {
        const customSiderContent = "customSiderContent";
        const CustomSider = () => <p>{customSiderContent}</p>;

        // const customHeaderContent = "customHeaderContent";
        // const CustomHeader = () => <p>{customHeaderContent}</p>;

        const customFooterContent = "customFooterContent";
        const CustomFooter = () => <p>{customFooterContent}</p>;

        const customOffLayoutAreaContent = "customOffLayoutAreaContent";
        const CustomOffLayoutArea = () => <p>{customOffLayoutAreaContent}</p>;

        renderWithAdminContext(<LayoutWrapper />, {
            warnWhenUnsavedChanges: false,
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 5000,
            hasDashboard: false,
            Sider: CustomSider,
            // Header: CustomHeader,
            Footer: CustomFooter,
            OffLayoutArea: CustomOffLayoutArea,
        });

        expect(screen.getByText(customSiderContent));
        // expect(screen.getByText(customHeaderContent));
        expect(screen.getByText(customFooterContent));
        expect(screen.getByText(customOffLayoutAreaContent));
    });

    test("LayoutWrapper renders custom components if given custom Layout renders them", () => {
        const CustomLayout: React.FC<LayoutProps> = ({
            Header,
            Sider,
            Footer,
            OffLayoutArea,
            children,
        }) => (
            <div>
                <Header />
                <Sider />
                {children}
                <Footer />
                <OffLayoutArea />
            </div>
        );

        const customSiderContent = "customSiderContent";
        const CustomSider = () => <p>{customSiderContent}</p>;

        const customHeaderContent = "customHeaderContent";
        const CustomHeader = () => <p>{customHeaderContent}</p>;

        const customFooterContent = "customFooterContent";
        const CustomFooter = () => <p>{customFooterContent}</p>;

        const customOffLayoutAreaContent = "customOffLayoutAreaContent";
        const CustomOffLayoutArea = () => <p>{customOffLayoutAreaContent}</p>;

        const { getByText } = renderWithAdminContext(<LayoutWrapper />, {
            warnWhenUnsavedChanges: false,
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 5000,
            hasDashboard: false,
            Layout: CustomLayout,
            Sider: CustomSider,
            Header: CustomHeader,
            Footer: CustomFooter,
            OffLayoutArea: CustomOffLayoutArea,
        });

        expect(getByText(customSiderContent));
        expect(getByText(customHeaderContent));
        expect(getByText(customFooterContent));
        expect(getByText(customOffLayoutAreaContent));
    });

    test("LayoutWrapper renders custom title if given default Sider", () => {
        const customTitleContent = "customTitleContent";
        const CustomTitle = () => <p>{customTitleContent}</p>;

        const { getByText } = renderWithAdminContext(<LayoutWrapper />, {
            warnWhenUnsavedChanges: false,
            mutationMode: "pessimistic",
            syncWithLocation: false,
            undoableTimeout: 5000,
            hasDashboard: false,
            Title: CustomTitle,
        });

        expect(getByText(customTitleContent));
    });
});
