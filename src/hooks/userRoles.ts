import { planProducer } from "config/localStorageKeys";

type PlanType = "visitor" | "basic" | "pro" | "bigger";

export function usePlanFeatures() {
    const plan = planProducer as PlanType;

    const features = {
        hotmartIntegration: plan === "bigger",
        customDomain: plan !== "visitor",
        videoHosting: plan !== "visitor",
        massIntegration: plan === "pro" || plan === "bigger",
        prioritySupport: plan === "pro" || plan === "bigger",
        vipSupport: plan === "bigger",
        advancedAutomation: plan === "bigger",
        customCertificates: plan === "bigger",
        reportsAccess: plan === "bigger",
    };

    const canHaveMoreInfoProducts = (infoProducts: any) => {
        if (plan === "visitor") return infoProducts.length <= 1;
        if (plan === "basic") return infoProducts.length <= 3;
        return true;
    };

    const canHaveMoreStudents = (students: any) => {
        if (plan === "basic") return students.length <= 2000;
        if (plan === "pro") return students.length <= 7000;
        return true;
    };

    const canHaveMoreMemberAreas = (memberAreas: any) => {
        if (plan === "visitor") return memberAreas.length <= 1;
        if (plan === "basic") return memberAreas.length <= 2;
        if (plan === "pro" || plan === "bigger") return memberAreas.length <= 3;
        return false;
    };

    const canHaveMoreModules = (modules: any) => {
        if (plan === "visitor") return modules.length <= 10;
        return true;
    };

    return {
        ...features,
        canHaveMoreInfoProducts,
        canHaveMoreStudents,
        canHaveMoreMemberAreas,
        canHaveMoreModules,
    };
}
