import IMovement from "@model/income/IMovement";
import {deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where,} from "@firebase/firestore";
import {movementsCollection} from "@utils/firebase";
import logging from "@utils/logging";
import {nanoid} from "nanoid";
import DateUtils from "@utils/DateUtils";

export default class MovementService {
    static getMovements = async (userId: string): Promise<IMovement[]> => {
        try {
            logging.info(`Fetching movements for user ${userId}`);
            if (userId) {
                const q = query(
                    movementsCollection,
                    where("userId", "==", userId),
                    orderBy("createdAt", "desc"),
                    orderBy("id")
                );
                const querySnap = await getDocs(q);
                const items = querySnap.docs?.map((d) => d.data() as IMovement);
                return Promise.resolve(items || []);
            } else {
                return Promise.reject(`Can't fetch movement for a ${userId} user id`);
            }
        } catch (e) {
            logging.error(`Error while getting movements: ${e.message || e}`);
            return Promise.reject(e.message);
        }
    };

    static addMovement = async (
        newMovement: Partial<IMovement>,
        userId: string
    ): Promise<void> => {
        try {
            const movementId = nanoid(16).toString();
            const movement = {
                ...newMovement,
                id: movementId,
                createdAt: DateUtils.getCurrentTimestamp(),
                userId: userId,
            };
            await setDoc(doc(movementsCollection, movementId), movement);
            return Promise.resolve();
        } catch (e) {
            const message = `Problem occurred when adding movement: ${
                e.message || e
            } (${JSON.stringify(newMovement)})`;
            console.error(message);
            return Promise.reject(message);
        }
    };

    static deleteMovement = async (movementId: string): Promise<void> => {
        try {
            await deleteDoc(doc(movementsCollection, movementId));
            return Promise.resolve();
        } catch (e) {
            const message = `Problem occurred when deleting movement: ${
                e.message || e
            } (${movementId})`;
            console.error(message);
            return Promise.reject(message);
        }
    };

    static updateMovementStatus = async (
        movementId: string,
        isInactive: boolean
    ): Promise<Partial<IMovement>> => {
        try {
            const movement: Partial<IMovement> = {
                isInactive: isInactive,
                updatedAt: DateUtils.getCurrentTimestamp(),
            };
            await updateDoc(doc(movementsCollection, movementId), movement);
            return Promise.resolve(movement);
        } catch (e) {
            const message = `Problem occurred when updating movement status: ${
                e.message || e
            } (${movementId},${isInactive})`;
            console.error(message);
            return Promise.reject(message);
        }
    };

    static updateMovement = async (
        movement: Partial<IMovement>
    ): Promise<Partial<IMovement>> => {
        try {
            const movementUpdated: Partial<IMovement> = {
                ...movement,
                updatedAt: DateUtils.getCurrentTimestamp(),
            };
            await updateDoc(doc(movementsCollection, movement.id), movementUpdated);
            return Promise.resolve(movementUpdated);
        } catch (e) {
            const message = `Problem occurred when updating movement ${
                e.message || e
            } (${JSON.stringify(movement.id)})`;
            console.error(message);
            return Promise.reject(message);
        }
    };
}
