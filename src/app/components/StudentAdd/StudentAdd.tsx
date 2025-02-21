import { addStudent } from "@/app/triggers/students";
import useSWRMutation from "swr/mutation";
import { Button, Group, TextInput, NumberInput } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';

interface StudentFormValues {
    name: string;
    age: number;
    description: string;
}

export default function StudentAdd() {
    // Utilisation de TypeScript pour typer les valeurs du formulaire
    const form = useForm<StudentFormValues>({
        initialValues: {
            name: '',
            age: 0,
            description: ''
        },
        validate: {
            name: (value) => value.length > 0 ? null : 'Nom requis',
            age: (value) => value > 0 ? null : 'L\'âge doit être supérieur à 0',
            description: (value) => value.length > 0 ? null : 'Description requise'
        },
    });

    const { trigger, isMutating } = useSWRMutation("/api/students/add", addStudent);

    // Fonction de soumission avec TypeScript pour garantir les types
    const handleSubmit = async (values: StudentFormValues) => {
        const data = await trigger({
            name: values.name,
            age: values.age,
            description: values.description
        });

        // Réinitialisation du formulaire après soumission
        form.reset();
    };

    return (
        <form
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '500px', marginInline: 'auto', paddingInline: '5vw' }}
            onSubmit={form.onSubmit(handleSubmit)} // Utilisation de onSubmit de Mantine
        >
            <TextInput
                withAsterisk
                label="Nom"
                placeholder="Nom de l'étudiant"
                {...form.getInputProps('name')}
            />
            <NumberInput
                withAsterisk
                label="Âge"
                placeholder="Âge"
                min={1}
                {...form.getInputProps('age')}
            />
            <TextInput
                withAsterisk
                label="Description"
                placeholder="Description"
                {...form.getInputProps('description')}
            />
            
            { !isMutating ? 
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group> : 
                <span>Enregistrement...</span>
            }
        </form>
    );
}
