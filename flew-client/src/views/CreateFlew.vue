<template>
  <div class="create-flew">
    <CreationProcess
      v-if="actualStep == 'Creation/ProcessType'"
      @quick-creation="QuickCreation"
      @advanced-creation="AdvancedCreation"
    />
    <CreationFlewName
      v-if="actualStep == 'Creation/FlewName'"
      @next-step="FlewName"
      @cancel-step="Cancel('FlewName')"
    />
    <CreationConfirm
      v-if="actualStep == 'Creation/Confirm'"
      @next-step="FlewCreate"
      @cancel-step="Cancel('Confirm')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Store
import { useFlew } from "../store/modules/flew/Flew";
import { useUser } from "../store/modules/user/User";

// Components
import CreationProcess from "@/components/create-flew/CreationProcess.vue";
import CreationFlewName from "@/components/create-flew/CreationFlewName.vue";
import CreationConfirm from "@/components/create-flew/CreationConfirm.vue";

// Interfaces
import { ICreateFlew, IFlew } from "@/store/interfaces/Flew";

export default defineComponent({
  setup() {
    const flewStore = useFlew();
    const userStore = useUser();

    return {
      flewStore,
      userStore,
    };
  },
  name: "CreateFlewView",
  components: {
    CreationProcess,
    CreationFlewName,
    CreationConfirm,
  },
  methods: {
    // Creation Process Type
    QuickCreation() {
      this.actualStep = "Creation/FlewName";
    },
    AdvancedCreation() {
      this.actualStep = "Creation/FlewName";
    },
    // Flew Name
    FlewName(flewNameData: any) {
      this.actualStep = "Creation/Confirm";
      this.flewDataToCreate.name = flewNameData.flewName;
      this.flewDataToCreate.description = flewNameData.flewDescription;
    },
    // Confirm
    FlewCreate() {
      this.flewDataToCreate.userId = this.userStore.user.userId;
      this.flewStore.createFlew(this.flewDataToCreate);
    },
    // Cancel
    Cancel(step: string) {
      if (step === "FlewName") {
        this.actualStep = "Creation/ProcessType";
      } else if (step === "Confirm") {
        this.actualStep = "Creation/FlewName";
      }
    },
  },
  mounted() {
    // Set current flew to undefined
    this.flewStore.currentFlew = {} as IFlew;
  },
  data() {
    return {
      flewDataToCreate: {} as ICreateFlew,
      actualStep: "Creation/ProcessType" as string,
    };
  },
});
</script>

<style lang="scss" scoped="true">
.create-flew {
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
}
</style>
