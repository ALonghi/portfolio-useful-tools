export default interface IMovement {
    id: string;
    name: string;
    amount: number;
    frequency: "monthly" | "yearly";
    movementType: "income" | "expense" | "investment";
    userId: string;
    reason?: "necessary" | "additional";
    createdAt: string;
    updatedAt?: string;
    isInactive?: boolean;
}
